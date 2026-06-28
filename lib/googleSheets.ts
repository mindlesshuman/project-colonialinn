import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function appendToGoogleSheet(reservationData: any) {
  // If the credentials are not set, silently skip pushing to Google Sheets
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.warn("Google Sheets credentials are not set. Skipping sheet update.");
    return false;
  }

  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo(); 
    
    // Assumes the first sheet is the one we want to append to
    const sheet = doc.sheetsByIndex[0]; 

    // Append the row. Ensure the keys match the headers in your Google Sheet
    await sheet.addRow({
      "Date Booked": new Date().toLocaleString(),
      "First Name": reservationData.firstName,
      "Last Name": reservationData.lastName,
      "Email": reservationData.email,
      "Phone": reservationData.phone || 'N/A',
      "Check-In Date": reservationData.checkInDate,
      "Check-In Time": reservationData.checkInTime,
      "Check-Out Date": reservationData.checkOutDate,
      "Check-Out Time": reservationData.checkOutTime,
      "Room Type": reservationData.roomType,
      "Guests": reservationData.guests,
      "Message": reservationData.message || 'None'
    });

    return true;
  } catch (error) {
    console.error("Error pushing to Google Sheets:", error);
    return false;
  }
}

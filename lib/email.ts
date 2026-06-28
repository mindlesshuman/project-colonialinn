import nodemailer from 'nodemailer';

interface SendConfirmationParams {
  to: string;
  firstName: string;
  lastName: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
  roomType: string;
  guests: number;
}

function formatTime12h(time24: string) {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}

export async function sendConfirmationEmail(params: SendConfirmationParams) {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn("EMAIL_USER or EMAIL_PASS is missing in .env. Skipping email confirmation.");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #241A15; padding: 30px; text-align: center;">
          <h1 style="color: #F8F5F2; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Colonial Inn</h1>
        </div>
        
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #241A15; margin-top: 0;">Reservation Confirmed!</h2>
          <p style="color: #555555; line-height: 1.6;">
            Dear ${params.firstName} ${params.lastName},
          </p>
          <p style="color: #555555; line-height: 1.6;">
            Thank you for choosing Colonial Inn for your upcoming visit to Cebu. We are delighted to officially confirm your reservation and express our sincere gratitude for your patronage.
          </p>
          <p style="color: #555555; line-height: 1.6;">
            Our dedicated staff is committed to providing you with exceptional service, a comfortable atmosphere, and true Philippine hospitality. We eagerly await your arrival.
          </p>
          
          <div style="background-color: #F8F5F2; padding: 20px; border-radius: 5px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #241A15; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Stay Details</h3>
            <ul style="list-style: none; padding: 0; margin: 0; color: #444;">
              <li style="margin-bottom: 10px;"><strong>Check-in:</strong> ${params.checkInDate} at ${formatTime12h(params.checkInTime)}</li>
              <li style="margin-bottom: 10px;"><strong>Check-out:</strong> ${params.checkOutDate} at ${formatTime12h(params.checkOutTime)}</li>
              <li style="margin-bottom: 10px;"><strong>Room:</strong> <span style="text-transform: capitalize;">${params.roomType}</span> Room</li>
              <li><strong>Guests:</strong> ${params.guests}</li>
            </ul>
          </div>
          
          <p style="color: #555555; line-height: 1.6;">
            If you require any assistance prior to your arrival, such as airport transfers or special requests, please reply directly to this email or contact our front desk.
          </p>
          
          <p style="color: #555555; line-height: 1.6; margin-bottom: 0;">
            Warmest regards,<br>
            <strong>Management & Staff</strong><br>
            Colonial Inn
          </p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888;">
          Colonial Inn, Cebu City, Philippines<br>
          This is an automated message. Please do not reply if you do not have inquiries.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Colonial Inn" <${EMAIL_USER}>`,
      to: params.to,
      subject: 'Reservation Confirmed - Colonial Inn',
      html: htmlTemplate,
    });

    console.log(`Confirmation email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
}

export async function sendInquiryReceivedEmail(params: SendConfirmationParams) {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #241A15; padding: 30px; text-align: center;">
          <h1 style="color: #F8F5F2; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Colonial Inn</h1>
        </div>
        
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #241A15; margin-top: 0;">Reservation Inquiry Received!</h2>
          <p style="color: #555555; line-height: 1.6;">
            Dear ${params.firstName} ${params.lastName},
          </p>
          <p style="color: #555555; line-height: 1.6;">
            Thank you for considering Colonial Inn for your upcoming visit to Cebu. We have successfully received your reservation request.
          </p>
          <p style="color: #555555; line-height: 1.6; font-weight: bold;">
            Please note that this email acknowledges receipt of your inquiry. Our reservations team is currently reviewing our availability and will contact you shortly to officially confirm your booking.
          </p>
          
          <div style="background-color: #F8F5F2; padding: 20px; border-radius: 5px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #241A15; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Requested Details</h3>
            <ul style="list-style: none; padding: 0; margin: 0; color: #444;">
              <li style="margin-bottom: 10px;"><strong>Check-in:</strong> ${params.checkInDate} at ${formatTime12h(params.checkInTime)}</li>
              <li style="margin-bottom: 10px;"><strong>Check-out:</strong> ${params.checkOutDate} at ${formatTime12h(params.checkOutTime)}</li>
              <li style="margin-bottom: 10px;"><strong>Room:</strong> <span style="text-transform: capitalize;">${params.roomType}</span> Room</li>
              <li><strong>Guests:</strong> ${params.guests}</li>
            </ul>
          </div>
          
          <p style="color: #555555; line-height: 1.6; margin-bottom: 0;">
            Warmest regards,<br>
            <strong>Management & Staff</strong><br>
            Colonial Inn
          </p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888;">
          Colonial Inn, Cebu City, Philippines<br>
          This is an automated message. Please do not reply if you do not have inquiries.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Colonial Inn" <${EMAIL_USER}>`,
      to: params.to,
      subject: 'Inquiry Received - Colonial Inn',
      html: htmlTemplate,
    });

    return true;
  } catch (error) {
    console.error('Error sending inquiry email:', error);
    return false;
  }
}

export async function sendUnavailableEmail(params: SendConfirmationParams) {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #241A15; padding: 30px; text-align: center;">
          <h1 style="color: #F8F5F2; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Colonial Inn</h1>
        </div>
        
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #c0392b; margin-top: 0;">Room Unavailable</h2>
          <p style="color: #555555; line-height: 1.6;">
            Dear ${params.firstName} ${params.lastName},
          </p>
          <p style="color: #555555; line-height: 1.6;">
            Thank you for considering Colonial Inn. We sincerely appreciate your interest in our property.
          </p>
          <p style="color: #555555; line-height: 1.6;">
            We regret to inform you that we are fully booked and unable to accommodate your request for a <strong>${params.roomType}</strong> room during your selected dates (${params.checkInDate} ${formatTime12h(params.checkInTime)} to ${params.checkOutDate} ${formatTime12h(params.checkOutTime)}).
          </p>
          <p style="color: #555555; line-height: 1.6;">
            Please accept our apologies for any inconvenience this may cause to your travel plans. Should your dates be flexible, our front desk team would be delighted to assist you in finding alternative availability. We hope to have the honor of welcoming you in the near future.
          </p>
          
          <p style="color: #555555; line-height: 1.6; margin-bottom: 0; margin-top: 30px;">
            Warmest regards,<br>
            <strong>Management & Staff</strong><br>
            Colonial Inn
          </p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888;">
          Colonial Inn, Cebu City, Philippines<br>
          This is an automated message.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Colonial Inn" <${EMAIL_USER}>`,
      to: params.to,
      subject: 'Reservation Update - Room Unavailable',
      html: htmlTemplate,
    });

    return true;
  } catch (error) {
    console.error('Error sending unavailable email:', error);
    return false;
  }
}

import nodemailer from 'nodemailer';

interface SendConfirmationParams {
  to: string;
  firstName: string;
  lastName: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  guests: number;
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
            We are thrilled to confirm your reservation at Colonial Inn. We are looking forward to hosting you in Cebu!
          </p>
          
          <div style="background-color: #F8F5F2; padding: 20px; border-radius: 5px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #241A15; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Stay Details</h3>
            <ul style="list-style: none; padding: 0; margin: 0; color: #444;">
              <li style="margin-bottom: 10px;"><strong>Check-in:</strong> ${params.checkInDate} (After 2:00 PM)</li>
              <li style="margin-bottom: 10px;"><strong>Check-out:</strong> ${params.checkOutDate} (Before 12:00 PM)</li>
              <li style="margin-bottom: 10px;"><strong>Room:</strong> <span style="text-transform: capitalize;">${params.roomType}</span> Room</li>
              <li><strong>Guests:</strong> ${params.guests}</li>
            </ul>
          </div>
          
          <p style="color: #555555; line-height: 1.6;">
            If you need to make any changes to your reservation or have special requests, please reply directly to this email or call our front desk.
          </p>
          
          <p style="color: #555555; line-height: 1.6; margin-bottom: 0;">
            Warm regards,<br>
            <strong>The Colonial Inn Team</strong>
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
            Thank you for your interest in staying at Colonial Inn. We have successfully received your reservation inquiry!
          </p>
          <p style="color: #555555; line-height: 1.6; font-weight: bold;">
            Please note: This is just an inquiry. Our staff will reach out to you within the day to confirm if the room is available for your requested dates.
          </p>
          
          <div style="background-color: #F8F5F2; padding: 20px; border-radius: 5px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #241A15; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Requested Details</h3>
            <ul style="list-style: none; padding: 0; margin: 0; color: #444;">
              <li style="margin-bottom: 10px;"><strong>Check-in:</strong> ${params.checkInDate}</li>
              <li style="margin-bottom: 10px;"><strong>Check-out:</strong> ${params.checkOutDate}</li>
              <li style="margin-bottom: 10px;"><strong>Room:</strong> <span style="text-transform: capitalize;">${params.roomType}</span> Room</li>
              <li><strong>Guests:</strong> ${params.guests}</li>
            </ul>
          </div>
          
          <p style="color: #555555; line-height: 1.6; margin-bottom: 0;">
            Warm regards,<br>
            <strong>The Colonial Inn Team</strong>
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
            Thank you for your interest in staying with us. Unfortunately, we regret to inform you that our <strong>${params.roomType}</strong> rooms are fully booked for your requested dates (${params.checkInDate} to ${params.checkOutDate}).
          </p>
          <p style="color: #555555; line-height: 1.6;">
            We apologize for the inconvenience. If your travel dates are flexible, please reply to this email or call our front desk, and we would be happy to help you find alternative dates for your stay!
          </p>
          
          <p style="color: #555555; line-height: 1.6; margin-bottom: 0; margin-top: 30px;">
            Warm regards,<br>
            <strong>The Colonial Inn Team</strong>
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

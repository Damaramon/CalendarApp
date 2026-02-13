import { createTransporter } from '../config/email';

interface EmailData {
    email: string;
    date: string;
    description: string;
}

export const sendCalendarEmail = async (data: EmailData): Promise<void> => {
    const transporter = createTransporter();

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Hi Salam kenal</h2>
      <p style="color: #666; line-height: 1.6;">
        A new calendar entry has been created with the following details:
      </p>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</p>
        <p style="margin: 10px 0;"><strong>Date:</strong> ${data.date}</p>
        <p style="margin: 10px 0;"><strong>Description:</strong> ${data.description}</p>
      </div>
      <p style="color: #999; font-size: 12px; margin-top: 30px;">
        This is an automated message. Please do not reply to this email.
      </p>
    </div>
  `;

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@calendar.com',
        to: data.email,
        subject: 'Hi Salam kenal - New Calendar Entry Created',
        html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
};

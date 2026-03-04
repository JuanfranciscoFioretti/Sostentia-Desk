import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendSupportEmail(
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  plan: string
) {
  try {
    const planNames: Record<string, string> = {
      starter: 'Starter - $497/month',
      growth: 'Growth - $597/month',
      enterprise: 'Enterprise Pro - $1,290/month',
    };

    // Email to the support team
    await transporter.sendMail({
      from: `Sostentia Desk <${process.env.SMTP_EMAIL}>`,
      to: 'sostentia@gmail.com',
      subject: `New Support Inquiry: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                overflow: hidden;
              }
              .header {
                background: linear-gradient(135deg, #000000 0%, #047857 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
              }
              .content {
                padding: 30px 20px;
              }
              .info-box {
                background-color: #f9f9f9;
                border-left: 4px solid #047857;
                padding: 15px;
                margin-bottom: 20px;
                border-radius: 4px;
              }
              .info-box p {
                margin: 8px 0;
              }
              .label {
                font-weight: 600;
                color: #047857;
                display: inline-block;
                width: 120px;
              }
              .message-box {
                background-color: #f0f0f0;
                padding: 15px;
                border-radius: 4px;
                margin: 20px 0;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
                border-top: 1px solid #e0e0e0;
              }
              .timestamp {
                color: #999;
                font-size: 12px;
                margin-top: 10px;
              }
              .plan-badge {
                display: inline-block;
                background-color: #047857;
                color: white;
                padding: 4px 8px;
                border-radius: 3px;
                font-size: 12px;
                font-weight: 600;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Support Message</h1>
              </div>
              <div class="content">
                <div class="info-box">
                  <p><span class="label">From:</span> ${name}</p>
                  <p><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></p>
                  <p><span class="label">Phone:</span> <a href="tel:${phone.replace(/\s/g, '')}">${phone}</a></p>
                  <p><span class="label">Subject:</span> ${subject}</p>
                  <p><span class="label">Interested Plan:</span> <span class="plan-badge">${planNames[plan]}</span></p>
                </div>
                
                <h3 style="margin-top: 25px; margin-bottom: 10px; color: #333;">Message:</h3>
                <div class="message-box">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</div>
                
                <div class="timestamp">
                  Received on: ${new Date().toLocaleString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZoneName: 'short'
                  })}
                </div>
              </div>
              <div class="footer">
                <p>This is an automated message from Sostentia Desk Support System</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Confirmation email to the user
    await transporter.sendMail({
      from: `Sostentia Desk <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: `We received your message: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                overflow: hidden;
              }
              .header {
                background: linear-gradient(135deg, #000000 0%, #047857 100%);
                color: white;
                padding: 30px 20px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
              }
              .content {
                padding: 30px 20px;
              }
              .success-box {
                background-color: #e8f5e9;
                border-left: 4px solid #4caf50;
                padding: 15px;
                margin-bottom: 20px;
                border-radius: 4px;
                color: #2e7d32;
              }
              .message-preview {
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 4px;
                margin: 20px 0;
                border: 1px solid #e0e0e0;
              }
              .message-preview h4 {
                margin: 0 0 10px 0;
                color: #047857;
              }
              .message-content {
                background-color: #fff;
                padding: 10px;
                border-radius: 3px;
                white-space: pre-wrap;
                word-wrap: break-word;
                font-size: 14px;
              }
              .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #000000 0%, #047857 100%);
                color: white;
                padding: 12px 25px;
                text-decoration: none;
                border-radius: 4px;
                margin-top: 20px;
                font-weight: 600;
              }
              .footer {
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
                border-top: 1px solid #e0e0e0;
              }
              .info-detail {
                font-size: 14px;
                color: #666;
                margin-bottom: 8px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✓ Message Received</h1>
              </div>
              <div class="content">
                <p>Hello <strong>${name}</strong>,</p>
                
                <div class="success-box">
                  <p>Thank you for contacting Sostentia Desk! We have successfully received your message and our support team will review it shortly. We aim to respond to all inquiries within 24 hours.</p>
                </div>
                
                <h3 style="color: #333; margin-top: 25px;">Your Message Summary:</h3>
                <div class="message-preview">
                  <h4>Subject: ${subject}</h4>
                  <div class="message-content">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</div>
                  <div style="margin-top: 15px; border-top: 1px solid #e0e0e0; padding-top: 15px;">
                    <div class="info-detail"><strong>Interested Plan:</strong> ${planNames[plan]}</div>
                  </div>
                </div>
                
                <p style="color: #666; font-size: 14px;">
                  <strong>Reference ID:</strong> ${Date.now()}<br>
                  <strong>Contact Phone:</strong> ${phone}<br>
                  <strong>Received at:</strong> ${new Date().toLocaleString()}
                </p>
                
                <p>If you have any additional questions or information to add, feel free to reply to this email.</p>
                
                <p style="margin-top: 30px; color: #666;">
                  Best regards,<br>
                  <strong>Sostentia Desk Support Team</strong>
                </p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} Sostentia Desk. All rights reserved.</p>
                <p>This is an automated confirmation email. Please do not reply with sensitive information.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email');
  }
}

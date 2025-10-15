const nodemailer = require('nodemailer');

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail', // You can change this to other services
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

// Email templates
const emailTemplates = {
  appointmentNotification: (appointment, teacher, student) => {
    return {
      subject: `New Appointment Request - ${appointment.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">📅 New Appointment Request</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">School of Electrical & Computer Engineering</p>
            <p style="margin: 5px 0 0; opacity: 0.8; font-size: 14px;">Dilla University, Ethiopia</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1e40af; margin-top: 0;">Hello ${teacher.full_name}!</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              You have received a new appointment request from <strong>${student.full_name}</strong>.
            </p>
            
            <div style="background: #eff6ff; border-left: 4px solid #1e40af; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Appointment Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500; width: 120px;">Title:</td>
                  <td style="padding: 8px 0; color: #374151; font-weight: 600;">${appointment.title}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Date:</td>
                  <td style="padding: 8px 0; color: #374151; font-weight: 600;">${new Date(appointment.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Time:</td>
                  <td style="padding: 8px 0; color: #374151; font-weight: 600;">${appointment.time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Duration:</td>
                  <td style="padding: 8px 0; color: #374151; font-weight: 600;">${appointment.duration} minutes</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Status:</td>
                  <td style="padding: 8px 0;">
                    <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                      PENDING
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            
            ${appointment.description ? `
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #374151; margin-top: 0;">Message from Student:</h4>
                <p style="color: #6b7280; line-height: 1.6; margin: 0;">${appointment.description}</p>
              </div>
            ` : ''}
            
            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <p style="color: #1e40af; margin: 0; font-weight: 600;">
                Please log in to your dashboard to approve or reject this appointment request.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/teacher/dashboard" 
                 style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); 
                        color: white; 
                        padding: 12px 30px; 
                        text-decoration: none; 
                        border-radius: 8px; 
                        font-weight: 600;
                        display: inline-block;">
                View Dashboard
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <div style="text-align: center; color: #6b7280; font-size: 14px;">
              <p style="margin: 0;">
                This is an automated notification from the School Appointment System.<br>
                Please do not reply to this email.
              </p>
              <p style="margin: 10px 0 0; font-size: 12px;">
                Designed by <strong>Dawit Abrha (DafiTech)</strong> ❤️
              </p>
            </div>
          </div>
        </div>
      `
    };
  }
};

// Send email notification
const sendAppointmentNotification = async (appointment, teacher, student) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates.appointmentNotification(appointment, teacher, student);
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: teacher.email,
      subject: template.subject,
      html: template.html
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('📧 Email notification sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Failed to send email notification:', error);
    return { success: false, error: error.message };
  }
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Email configuration failed:', error);
    return false;
  }
};

module.exports = {
  sendAppointmentNotification,
  testEmailConfig
};

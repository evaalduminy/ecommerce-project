const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

const getOrderEmailTemplate = (order, type) => {
  let title = 'Order Update';
  if (type === 'created') title = 'Order Confirmed';
  if (type === 'cancelled') title = 'Order Cancelled';
  if (type === 'accepted') title = 'Order Accepted by Vendor';

  return `
    <div style="font-family: 'Inter', sans-serif; background-color: #121212; color: #ffffff; padding: 40px; border-radius: 8px;">
      <h1 style="color: #d80000; text-align: center; font-size: 24px; text-transform: uppercase;">Crimson Market</h1>
      <div style="background-color: #1E1E1E; padding: 24px; border-radius: 8px; margin-top: 24px; border: 1px solid #333;">
        <h2 style="color: #ffffff; margin-top: 0;">${title}</h2>
        <p style="color: #9ca3af; line-height: 1.6;">Order ID: <strong>${order._id}</strong></p>
        <p style="color: #9ca3af; line-height: 1.6;">Status: <span style="color: #d80000; font-weight: bold;">${order.status.toUpperCase()}</span></p>
        <p style="color: #ffffff; font-size: 18px; font-weight: bold; margin-top: 24px;">Total Amount: $${order.totalAmount}</p>
        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #333; text-align: center;">
          <a href="${process.env.FRONTEND_URL}/profile" style="background-color: #d80000; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; display: inline-block;">View Order Details</a>
        </div>
      </div>
      <p style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 24px;">© ${new Date().getFullYear()} Crimson Market. All rights reserved.</p>
    </div>
  `;
};

const sendOrderEmail = async (to, order, type) => {
  if (!process.env.RESEND_API_KEY) {
    console.log('Skipping email notification: RESEND_API_KEY not configured.');
    return;
  }
  
  try {
    const htmlOutput = getOrderEmailTemplate(order, type);
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use this for testing until you verify your domain
      to: to,
      subject: `Crimson Market - Order ${order._id.toString().substring(0, 8)} Update`,
      html: htmlOutput
    });
  } catch (error) {
    console.error('Failed to send Resend email:', error);
  }
};

module.exports = {
  sendOrderEmail
};

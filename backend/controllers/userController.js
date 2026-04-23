const User = require('../models/User');
const { Resend } = require('resend');
const crypto = require('crypto');

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({ success: true, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await user.remove();
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.inviteAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Generate a secure registration link or code
    const inviteCode = crypto.randomBytes(20).toString('hex');
    // Save invite state temporarily in DB or Cache in a production app. Skipped here for brevity.
    
    const inviteHtml = `
      <div style="font-family: 'Inter', sans-serif; background-color: #121212; color: #ffffff; padding: 40px; border-radius: 8px;">
        <h1 style="color: #d80000; text-align: center; text-transform: uppercase;">Admin Invitation</h1>
        <div style="background-color: #1E1E1E; padding: 24px; border-radius: 8px; margin-top: 24px; border: 1px solid #333;">
          <p style="color: #9ca3af; line-height: 1.6;">You have been invited to become an Admin at Crimson Market.</p>
          <div style="margin-top: 32px; padding-top: 24px; text-align: center;">
            <a href="${process.env.FRONTEND_URL}/register?role=admin&code=${inviteCode}" style="background-color: #d80000; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; display: inline-block;">Accept Invitation</a>
          </div>
        </div>
      </div>
    `;

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Crimson Market <admin-invites@crimson-market.com>',
        to: email,
        subject: `Admin Invitation - Crimson Market`,
        html: inviteHtml
      });
    }

    res.json({ success: true, message: 'Invitation sent' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Admin Seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const seedAdmin = async () => {
  try {
    const adminEmail = process.argv[2];
    const adminPassword = process.argv[3];
    const adminName = process.argv[4] || 'Super Admin';

    if (!adminEmail || !adminPassword) {
      console.error('Usage: node seedAdmin.js <email> <password> [name]');
      process.exit(1);
    }

    const userExists = await User.findOne({ email: adminEmail });

    if (userExists) {
      console.error('User already exists');
      process.exit(1);
    }

    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });

    console.log('Admin user created successfully:', admin.email);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();

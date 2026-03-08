const mongoose = require('mongoose');
const Admin = require('./Models/Admin');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: 'diamondresort@gmail.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit();
    }

    const admin = new Admin({
      email: 'diamondresort@gmail.com',
      password: 'Diamondresortadmin@2026' // This will be hashed by the pre-save hook
    });

    await admin.save();
    console.log('Admin seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();

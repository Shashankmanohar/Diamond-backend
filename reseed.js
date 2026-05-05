const mongoose = require('mongoose');
const Admin = require('./Models/Admin');
require('dotenv').config();

const reseed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Admin.deleteMany({ email: 'diamondresort@gmail.com' });
    
    const admin = new Admin({
      email: 'diamondresort@gmail.com',
      password: 'Diamondresortadmin@2026'
    });
    
    await admin.save();
    console.log('Admin re-seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

reseed();

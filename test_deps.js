const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function test() {
  try {
    const pass = 'Diamondresortadmin@2026';
    const hash = await bcrypt.hash(pass, 10);
    console.log('Hash generated:', hash);
    const match = await bcrypt.compare(pass, hash);
    console.log('Match:', match);
    
    const token = jwt.sign({ id: 'test' }, process.env.JWT_SECRET || 'secret');
    console.log('Token generated:', token);
    
    console.log('All dependencies working fine.');
  } catch (err) {
    console.error('Error during test:', err);
  }
}

test();

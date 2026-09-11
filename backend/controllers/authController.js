import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Otp from '../models/Otp.js';
import { isDbConnected } from '../config/db.js';

// Temporary in-memory OTP store for fallback mode
const inMemoryOtps = new Map();
const inMemoryUsers = new Map();

// Generate 6-digit OTP
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || phone.length < 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number required' });
    }

    // Fixed demo OTP for fast testing / development: 123456
    const generatedOtp = '123456';

    if (isDbConnected()) {
      try {
        await Otp.deleteMany({ phone });
        await Otp.create({ phone, otp: generatedOtp });
      } catch (err) {
        inMemoryOtps.set(phone, { otp: generatedOtp, expiresAt: Date.now() + 5 * 60 * 1000 });
      }
    } else {
      inMemoryOtps.set(phone, { otp: generatedOtp, expiresAt: Date.now() + 5 * 60 * 1000 });
    }

    return res.status(200).json({
      success: true,
      message: `OTP sent successfully to ${phone}. (Demo OTP: ${generatedOtp})`,
      demoOtp: generatedOtp
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Verify OTP & return JWT
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp, name } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: 'Mobile number and OTP are required' });
    }

    let isValid = false;

    if (isDbConnected()) {
      try {
        const record = await Otp.findOne({ phone, otp });
        if (record || otp === '123456') {
          isValid = true;
          if (record) await Otp.deleteMany({ phone });
        }
      } catch (err) {
        const stored = inMemoryOtps.get(phone);
        if ((stored && stored.otp === otp) || otp === '123456') {
          isValid = true;
        }
      }
    } else {
      const stored = inMemoryOtps.get(phone);
      if ((stored && stored.otp === otp) || otp === '123456') {
        isValid = true;
      }
    }

    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP. Please try 123456.' });
    }

    // Find or create user
    let user;
    const role = (phone === '9876543210' || phone === '9150781685' || phone === '9999999999') ? 'admin' : 'citizen';

    if (isDbConnected()) {
      try {
        user = await User.findOne({ phone });
        if (!user) {
          user = await User.create({
            phone,
            name: name || (role === 'admin' ? 'TVK Admin' : 'TVK Citizen'),
            role,
            constituency: 'Chennai Central'
          });
        }
      } catch (err) {
        if (!inMemoryUsers.has(phone)) {
          inMemoryUsers.set(phone, {
            _id: `mem_${Date.now()}`,
            phone,
            name: name || (role === 'admin' ? 'TVK Admin' : 'TVK Citizen'),
            role,
            constituency: 'Chennai Central'
          });
        }
        user = inMemoryUsers.get(phone);
      }
    } else {
      if (!inMemoryUsers.has(phone)) {
        inMemoryUsers.set(phone, {
          _id: `mem_${Date.now()}`,
          phone,
          name: name || (role === 'admin' ? 'TVK Admin' : 'TVK Citizen'),
          role,
          constituency: 'Chennai Central'
        });
      }
      user = inMemoryUsers.get(phone);
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        phone: user.phone,
        name: user.name,
        role: user.role,
        constituency: user.constituency
      },
      process.env.JWT_SECRET || 'tvk_secret',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        constituency: user.constituency
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get current user profile
export const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
};

// Dedicated Admin Login Endpoint (Representative Admin Only)
export const adminLogin = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const identifier = (username || email || phone || '').toLowerCase().trim();
    const pass = (password || '').trim();

    // 1. Super Admin Disabled
    if (identifier.includes('super') || identifier === 'superadmin@tvk.org' || identifier === '9999999999') {
      return res.status(403).json({
        success: false,
        message: 'Super Admin access has been disabled. Admin login is strictly available ONLY for Aadhav Arjuna (arjuna.admin@tvk.org) & N. Anand (anand.admin@tvk.org).'
      });
    }

    // 2. Representative Admin Authentication (Configured Strictly for Aadhav Arjuna & N. Anand)
    let assignedLeader = null;
    let adminName = '';
    let constituency = '';

    if (identifier.includes('anand') || identifier.includes('bussy') || identifier.includes('tnagar')) {
      assignedLeader = 'N. Anand (Bussy Anand)';
      adminName = 'N. Anand (Bussy Anand) Executive Admin';
      constituency = 'Thiyagarayanagar (T. Nagar)';
    } else if (identifier.includes('arjuna') || identifier.includes('aadhav') || identifier.includes('villivakkam')) {
      assignedLeader = 'Aadhav Arjuna';
      adminName = 'Aadhav Arjuna Executive Admin';
      constituency = 'Villivakkam';
    }

    if (!assignedLeader) {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: Representative admin login is configured ONLY for Aadhav Arjuna (arjuna.admin@tvk.org) & N. Anand (anand.admin@tvk.org). All other admin logins have been removed.'
      });
    }

    const isValidPassword = 
      pass === 'admin123' || 
      pass === '123456' || 
      pass === 'admin' ||
      !pass;

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: `Invalid password for ${assignedLeader}. Demo Password: admin123`
      });
    }

    const adminUser = {
      _id: `admin_leader_${assignedLeader.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      name: adminName,
      phone: phone || '9876543210',
      email: email || `${assignedLeader.toLowerCase().includes('anand') ? 'anand' : 'arjuna'}.admin@tvk.org`,
      role: 'admin',
      assignedLeader: assignedLeader,
      constituency: constituency
    };

    const token = jwt.sign(
      {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        phone: adminUser.phone,
        role: 'admin',
        assignedLeader: adminUser.assignedLeader,
        constituency: adminUser.constituency
      },
      process.env.JWT_SECRET || 'tvk_secret',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: `${assignedLeader} Representative Admin Access Granted`,
      token,
      user: adminUser
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

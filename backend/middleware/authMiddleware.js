import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tvk_secret');
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Unauthorized, token failed verification' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized, no token provided' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'volunteer')) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Forbidden: Admin / Volunteer access required' });
};

export const admin = adminOnly;

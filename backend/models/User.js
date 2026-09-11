import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: 'TVK Citizen'
  },
  role: {
    type: String,
    enum: ['citizen', 'volunteer', 'admin'],
    default: 'citizen'
  },
  constituency: {
    type: String,
    default: 'Thiruparankundram'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User || mongoose.model('User', userSchema);

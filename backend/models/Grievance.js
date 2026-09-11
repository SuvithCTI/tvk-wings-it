import mongoose from 'mongoose';

const grievanceSchema = new mongoose.Schema({
  trackId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  constituency: {
    type: String,
    required: true
  },
  district: {
    type: String,
    default: 'Chennai District (சென்னை)'
  },
  address: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  targetLeader: {
    type: String,
    default: 'C. Joseph Vijay (Perambur)'
  },
  photoUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Submitted', 'In Verification', 'In Progress', 'Resolved'],
    default: 'Submitted'
  },
  remarks: {
    type: String,
    default: 'Grievance received by TVK Assembly Leader desk.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Grievance || mongoose.model('Grievance', grievanceSchema);

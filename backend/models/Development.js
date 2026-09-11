import mongoose from 'mongoose';

const developmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Infrastructure', 'Healthcare', 'Education', 'Digital', 'Sanitation'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: 'Thiruparankundram'
  },
  status: {
    type: String,
    enum: ['Completed', 'In Progress', 'Sanctioned'],
    default: 'In Progress'
  },
  budget: {
    type: String,
    default: 'Constituency Fund'
  },
  imageUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Development || mongoose.model('Development', developmentSchema);

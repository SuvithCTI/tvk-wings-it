import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tamilTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'award'
  },
  benefits: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);

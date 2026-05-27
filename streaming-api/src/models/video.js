const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, index: 'text' },
  category: { type: String, required: true, index: true },
  duration: Number,
  views: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

videoSchema.index({ views: -1, averageRating: -1 });

module.exports = mongoose.model('Video', videoSchema);
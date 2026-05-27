const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  viewedAt: { type: Date, default: Date.now, expires: '1y' },
  progress: { type: Number, min: 0, max: 100 },
  rating: { type: Number, min: 1, max: 5 }
});

module.exports = mongoose.model('History', historySchema);
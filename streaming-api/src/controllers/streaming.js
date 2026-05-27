const mongoose = require('mongoose');
const User = require('../models/user');
const Video = require('../models/video');
const History = require('../models/history');

module.exports = {
  async createUser(req, res) {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  },

  async createVideo(req, res) {
    const video = await Video.create(req.body);
    return res.status(201).json(video);
  },

  async registerView(req, res) {
    try {
      const { userId, videoId, progress, rating } = req.body;
      const history = await History.create({ userId, videoId, progress, rating });
      const video = await Video.findById(videoId);
      
      let updateQuery = { $inc: { views: 1 } };

      if (rating) {
        const newCount = (video.ratingsCount || 0) + 1;
        const newAvg = (((video.averageRating || 0) * (video.ratingsCount || 0)) + rating) / newCount;
        updateQuery.$set = { averageRating: newAvg };
        updateQuery.$inc.ratingsCount = 1;
      }

      await Video.findByIdAndUpdate(videoId, updateQuery);
      return res.json(history);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getRanking(req, res) {
    const topVideos = await Video.find().sort({ views: -1 }).limit(10);
    return res.json(topVideos);
  },

  async getUserHistory(req, res) {
    try {
      const { userId } = req.params;
      
      const history = await History.aggregate([
        { 
          $match: { 
            userId: new mongoose.Types.ObjectId(userId) 
          } 
        },
        {
          $lookup: {
            from: 'videos',
            localField: 'videoId',
            foreignField: '_id',
            as: 'videoDetails'
          }
        },
        { $unwind: '$videoDetails' },
        { $sort: { viewedAt: -1 } }
      ]);
      
      return res.json(history);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  
  async deleteVideo(req, res) {
    try {
      const { videoId } = req.params;
      const video = await Video.findByIdAndDelete(videoId);
      
      if (!video) {
        return res.status(404).json({ error: 'Vídeo não encontrado' });
      }
      
      return res.json({ message: 'Vídeo removido com sucesso!' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
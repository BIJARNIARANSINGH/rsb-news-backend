const News = require('../models/news');

// Add a new news article (admin only)
const createNews = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    const news = new News({
      title,
      content,
      imageUrl,
      author: req.user._id,
    });

    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create news' });
  }
};

// Get all news
const getAllNews = async (req, res) => {
  try {
    const news = await News.find().populate('author', 'username').sort({ date: -1 });
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

// Get single news by ID
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'username');
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

// Update news article (admin only)
const updateNews = async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNews) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.status(200).json(updatedNews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update news' });
  }
};

// Delete news article (admin only)
const deleteNews = async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete news' });
  }
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
};
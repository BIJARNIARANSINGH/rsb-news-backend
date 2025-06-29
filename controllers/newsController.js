import News from '../models/news.js';
export const createNews = async (req, res) => {
  try {
    const news = new News({ ...req.body, author: req.user.id });
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create news' });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().populate('author', 'username');
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
};

export const getMyNews = async (req, res) => {
  try {
    const news = await News.find({ author: req.user.id });
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your news' });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });

    if (news.author.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'News deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete news' });
  }
};
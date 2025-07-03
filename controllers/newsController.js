const News = require("../models/News");

// Create news
exports.createNews = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const authorId = req.user.userId;
    let mediaUrl = "";

    if (req.file) {
      mediaUrl = `/uploads/${req.file.filename}`;
    }

    const newsPost = new News({
      title,
      content,
      category,
      media: mediaUrl,
      createdAt: new Date(),
    });

    await newsPost.save();
    res.status(201).json(newsPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all news (sorted newest first)
exports.getAllNews = async (req, res) => {
  const newsList = await News.find().sort({ createdAt: -1 });
  res.status(200).json(newsList);
};

// Get single news by ID
exports.getNewsById = async (req, res) => {
  const article = await News.findById(req.params.id);
  if (!article) return res.status(404).json({ error: "Not found" });
  res.status(200).json(article);
};

// Update news
exports.updateNews = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    let mediaUrl;

    if (req.file) {
      mediaUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await News.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category,
        ...(mediaUrl && { media: mediaUrl }),
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
};

// Delete news
exports.deleteNews = async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Deleted successfully" });
};

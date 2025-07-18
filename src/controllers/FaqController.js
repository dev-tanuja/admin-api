const Faq = require('../models/Faq');

// Create new FAQ
exports.create = async (req, res) => {
  try {
    const { activityId, question, answer, status } = req.body;

    if (!activityId || !question || !answer) {
      return res.status(400).json({ message: 'activityId, question, and answer are required.' });
    }

    if (status && !['Active', 'Disable'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const faq = new Faq({ activityId, question, answer, status });
    await faq.save();

    res.status(201).json({ message: 'FAQ created', data: faq });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all FAQs (optionally filter by activityId)
exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.activityId) {
      filter.activityId = req.query.activityId;
    }

    const faqs = await Faq.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ data: faqs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single FAQ by ID
exports.get = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.status(200).json({ data: faq });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update FAQ by ID
exports.update = async (req, res) => {
  try {
    const { question, answer, status } = req.body;

    if (status && !['Active', 'Disable'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const updatedFaq = await Faq.findByIdAndUpdate(
      req.params.id,
      { question, answer, status },
      { new: true, runValidators: true }
    );

    if (!updatedFaq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    res.status(200).json({ message: 'FAQ updated', data: updatedFaq });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete FAQ by ID
exports.delete = async (req, res) => {
  try {
    const deletedFaq = await Faq.findByIdAndDelete(req.params.id);
    if (!deletedFaq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.status(200).json({ message: 'FAQ deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.activityGet = async (req, res) => {

}

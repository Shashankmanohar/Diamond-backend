const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    default: 'General'
  },
  author: {
    type: String,
    required: true
  },
  tags: [String],
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    required: true
  },
  seo: {
    title: String,
    description: String,
    keywords: String,
    extraHead: String
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

blogSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Blog', blogSchema);

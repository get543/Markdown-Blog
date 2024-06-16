const mongoose = require("mongoose"); // db
const { Marked } = require("marked"); // md to html converter
const slugify = require("slugify"); // repace id in url with something prettier
const createDomPurify = require("dompurify"); // sanitised converted html
const { JSDOM } = require("jsdom"); // additional package to sanitised html

const marked = new Marked();

const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
  }

  next();
});

module.exports = mongoose.model("Article", articleSchema);

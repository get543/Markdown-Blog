const mongoose = require("mongoose"); // db

const { Marked } = require("marked");
const { markedHighlight } = require("marked-highlight"); // highlight code blocks
const hljs = require("highlight.js"); // highlight code blocks
const markedFootnote = require("marked-footnote"); // GFM footnote
const { gfmHeadingId } = require("marked-gfm-heading-id"); // GFM heading IDs

const slugify = require("slugify"); // repace id in url with something prettier
const createDomPurify = require("dompurify"); // sanitised converted html
const { JSDOM } = require("jsdom"); // additional package to sanitised html

// marked options
const marked = new Marked();

// add highlight plugin
marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
  })
);

// add marked-footnote plugin
marked.use(markedFootnote());

// add GFM heading ID plugin
marked.use(gfmHeadingId());

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

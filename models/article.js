const mongoose = require("mongoose"); // db
// const { Marked } = require("marked"); // md to html converter
// const { markedHighlight } = require("marked-highlight"); // code highlight
const marked = require("marked");
// const pygmentize = require("pygmentize-bundled"); // code highlight
const slugify = require("slugify"); // repace id in url with something prettier
const createDomPurify = require("dompurify"); // sanitised converted html
const { JSDOM } = require("jsdom"); // additional package to sanitised html

// const marked = new Marked(
//   markedHighlight({
//     async: true,
//     highlight(code, lang) {
//       return new Promise((resolve) => {
//         pygmentize({ lang, format: "html" }, code, (err, result) => {
//           if (err) {
//             resolve(err);
//             return;
//           }

//           resolve(result.toString());
//         });
//       });
//     },
//   })
// );

const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
})

articleSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  }

  next()
})

module.exports = mongoose.model('Article', articleSchema)
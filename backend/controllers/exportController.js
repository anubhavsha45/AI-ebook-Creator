const fs = require("fs");
const PDFDocument = require("pdfkit");
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();

const { Document, Packer, Paragraph, TextRun, AlignmentType } = require("docx");

const Book = require("../models/Book");

// ==========================
// DOCX STYLES
// ==========================

const DOCX_STYLES = {
  fonts: {
    title: "Times New Roman",
    body: "Times New Roman",
  },
  sizes: {
    title: 48,
    heading: 32,
    body: 24,
  },
  spacing: {
    paragraphBefore: 200,
    paragraphAfter: 200,
  },
};

// ==========================
// PROCESS INLINE CONTENT
// ==========================

const processInlineContent = (children) => {
  const textRuns = [];
  let bold = false;
  let italic = false;

  children.forEach((child) => {
    if (child.type === "strong_open") bold = true;
    else if (child.type === "strong_close") bold = false;
    else if (child.type === "em_open") italic = true;
    else if (child.type === "em_close") italic = false;
    else if (child.type === "text") {
      textRuns.push(
        new TextRun({
          text: child.content,
          bold,
          italics: italic,
          font: DOCX_STYLES.fonts.body,
        }),
      );
    }
  });

  return textRuns;
};

// ==========================
// MARKDOWN → DOCX PARAGRAPHS
// ==========================

const renderMarkdownDocx = (markdown) => {
  const tokens = md.parse(markdown, {});
  const paragraphs = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === "paragraph_open") {
      const inlineToken = tokens[i + 1];

      if (inlineToken && inlineToken.type === "inline") {
        const textRuns = processInlineContent(inlineToken.children);

        paragraphs.push(
          new Paragraph({
            children: textRuns,
            spacing: {
              before: DOCX_STYLES.spacing.paragraphBefore,
              after: DOCX_STYLES.spacing.paragraphAfter,
            },
            alignment: AlignmentType.JUSTIFIED,
          }),
        );
      }
    }
  }

  return paragraphs;
};

// ==========================
// EXPORT DOCX
// ==========================

const exportAsDocument = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.userId.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    const children = [];

    // TITLE
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: book.title,
            bold: true,
            size: DOCX_STYLES.sizes.title,
          }),
        ],
        alignment: AlignmentType.CENTER,
      }),
    );

    // CHAPTERS
    book.chapters.forEach((chapter, index) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: chapter.title || `Chapter ${index + 1}`,
              bold: true,
              size: DOCX_STYLES.sizes.heading,
            }),
          ],
          spacing: { before: 400, after: 200 },
        }),
      );

      if (chapter.content)
        children.push(...renderMarkdownDocx(chapter.content));
    });

    const doc = new Document({
      sections: [{ children }],
    });

    const buffer = await Packer.toBuffer(doc);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${book.title.replace(/[^a-zA-Z0-9]/g, "_")}.docx"`,
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );

    res.setHeader("Content-Length", buffer.length);

    res.send(buffer);
  } catch (error) {
    console.error("Error exporting document:", error);

    res.status(500).json({
      message: "Server error during document export",
      error: error.message,
    });
  }
};

// ==========================
// TYPOGRAPHY (PDF)
// ==========================

const TYPOGRAPHY = {
  fonts: {
    serif: "Times-Roman",
    serifBold: "Times-Bold",
    serifItalic: "Times-Italic",
    sans: "Helvetica",
    sansBold: "Helvetica-Bold",
  },
  sizes: {
    title: 28,
    author: 16,
    chapterTitle: 20,
    h1: 18,
    h2: 16,
    h3: 14,
    body: 11,
  },
  spacing: {
    paragraphSpacing: 12,
    chapterSpacing: 24,
    headingSpacing: 18,
    listSpacing: 8,
  },
  colors: {
    text: "#333333",
    heading: "#1A1A1A",
    accent: "#4F46E5",
  },
};

// ==========================
// INLINE TOKENS (PDF)
// ==========================

const renderInlineTokens = (doc, tokens, options = {}) => {
  if (!tokens) return;

  let currentFont = TYPOGRAPHY.fonts.serif;
  let buffer = "";

  const flush = () => {
    if (!buffer) return;

    doc.font(currentFont).text(buffer, {
      continued: true,
      ...options,
    });

    buffer = "";
  };

  tokens.forEach((token) => {
    if (token.type === "text") buffer += token.content;
    else if (token.type === "strong_open") {
      flush();
      currentFont = TYPOGRAPHY.fonts.serifBold;
    } else if (token.type === "strong_close") {
      flush();
      currentFont = TYPOGRAPHY.fonts.serif;
    } else if (token.type === "em_open") {
      flush();
      currentFont = TYPOGRAPHY.fonts.serifItalic;
    } else if (token.type === "em_close") {
      flush();
      currentFont = TYPOGRAPHY.fonts.serif;
    }
  });

  flush();
  doc.text("", { continued: false });
};

// ==========================
// MARKDOWN → PDF
// ==========================

const renderMarkdown = (doc, markdown) => {
  const tokens = md.parse(markdown, {});

  let inList = false;
  let listType = null;
  let orderedListCounter = 1;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === "heading_open") {
      doc.font(TYPOGRAPHY.fonts.sansBold).fontSize(TYPOGRAPHY.sizes.h1);

      if (tokens[i + 1].type === "inline") {
        renderInlineTokens(doc, tokens[i + 1].children);
        i++;
      }

      doc.moveDown();
    } else if (token.type === "paragraph_open") {
      doc.font(TYPOGRAPHY.fonts.serif).fontSize(TYPOGRAPHY.sizes.body);

      if (tokens[i + 1].type === "inline") {
        renderInlineTokens(doc, tokens[i + 1].children);
        i++;
      }

      doc.moveDown();
    }
  }
};

// ==========================
// EXPORT PDF
// ==========================

const exportAsPDF = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.userId.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    const doc = new PDFDocument({
      margins: { top: 72, bottom: 72, left: 72, right: 72 },
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${book.title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf"`,
    );

    doc.pipe(res);

    // TITLE
    doc
      .font(TYPOGRAPHY.fonts.sansBold)
      .fontSize(TYPOGRAPHY.sizes.title)
      .text(book.title, { align: "center" });

    // ==========================
    // 🔥 FIX: ADD COVER IMAGE
    // ==========================
    if (book.coverImage) {
      try {
        const imagePath = `.${book.coverImage}`;

        if (fs.existsSync(imagePath)) {
          doc.moveDown(2);

          doc.image(imagePath, {
            fit: [250, 300],
            align: "center",
          });

          doc.moveDown(2);
        }
      } catch (err) {
        console.error("Image load error:", err);
      }
    }

    doc.addPage();

    // CHAPTERS
    book.chapters.forEach((chapter, index) => {
      doc
        .font(TYPOGRAPHY.fonts.sansBold)
        .fontSize(TYPOGRAPHY.sizes.chapterTitle)
        .text(chapter.title || `Chapter ${index + 1}`);

      doc.moveDown();

      if (chapter.content) renderMarkdown(doc, chapter.content);

      doc.addPage();
    });

    doc.end();
  } catch (error) {
    console.error("Error exporting PDF:", error);

    if (!res.headersSent)
      res.status(500).json({
        message: "Server error during PDF export",
        error: error.message,
      });
  }
};

// ==========================
// EXPORTS
// ==========================

module.exports = {
  exportAsPDF,
  exportAsDocument,
};

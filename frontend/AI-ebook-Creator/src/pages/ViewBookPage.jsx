import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ReactMarkdown from "react-markdown";

function ViewBookPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(0);

  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Fetch book
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get(`/api/book/${bookId}`);
        setBook(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBook();
  }, [bookId]);

  const increaseFont = () => {
    setFontSize((prev) => Math.min(prev + 2, 24));
  };

  const decreaseFont = () => {
    setFontSize((prev) => Math.max(prev - 2, 12));
  };

  if (!book) return <div className="p-6">Loading...</div>;

  const currentChapter = book.chapters[selectedChapter];

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* SIDEBAR */}
      <div
        className={`w-72 border-r p-5 overflow-y-auto transition ${
          darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"
        }`}
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm mb-4 hover:underline"
        >
          ← Back
        </button>

        <h2 className="font-semibold text-lg mb-6">{book.title}</h2>

        <div className="space-y-2">
          {book.chapters.map((chapter, index) => (
            <div
              key={index}
              onClick={() => setSelectedChapter(index)}
              className={`p-2 rounded-lg cursor-pointer transition
              ${
                selectedChapter === index
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-200"
              }`}
            >
              {chapter.title}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 overflow-y-auto">
        {/* TOP BAR */}
        <div
          className={`flex justify-between items-center px-8 py-4 border-b sticky top-0 z-10 transition
          ${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white"}`}
        >
          <h1 className="font-medium">Reading Mode</h1>

          <div className="flex items-center gap-4">
            {/* FONT CONTROL */}
            <button
              onClick={decreaseFont}
              className="px-2 py-1 border rounded hover:bg-gray-200 transition"
            >
              A-
            </button>

            <span className="text-sm">{fontSize}px</span>

            <button
              onClick={increaseFont}
              className="px-2 py-1 border rounded hover:bg-gray-200 transition"
            >
              A+
            </button>

            {/* DARK MODE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-10 py-10">
          <div className="max-w-3xl mx-auto">
            {/* TITLE */}
            <h1
              className={`font-bold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
              style={{ fontSize: fontSize + 8 }}
            >
              {currentChapter?.title}
            </h1>

            {/* AUTHOR */}
            <p className="text-sm text-gray-500 mb-8">
              by {book.author || "Unknown Author"}
            </p>

            {/* MARKDOWN CONTENT (FIXED DARK MODE 🔥) */}
            <div
              className={`prose max-w-none transition 
              ${
                darkMode
                  ? "prose-invert text-gray-200 prose-headings:text-white"
                  : "text-gray-800"
              }`}
              style={{
                fontSize: fontSize,
                lineHeight: "1.8",
              }}
            >
              <ReactMarkdown>{currentChapter?.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBookPage;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import axiosInstance from "../utils/axiosInstance";

function EditorPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // Fetch book
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get(`/api/book/${bookId}`);

        setBook(res.data);
        setChapters(res.data.chapters || []);

        if (res.data.chapters?.length > 0) {
          setSelectedChapter(0);
          setTitle(res.data.chapters[0].title);
          setValue(res.data.chapters[0].content || "");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBook();
  }, [bookId]);

  // Change chapter
  const selectChapter = (index) => {
    setSelectedChapter(index);
    setTitle(chapters[index].title);
    setValue(chapters[index].content || "");
  };

  // Generate chapter using AI
  const generateChapterAI = async () => {
    if (selectedChapter === null) return;

    try {
      setLoadingAI(true);

      const chapter = chapters[selectedChapter];

      const res = await axiosInstance.post("/api/ai/generate-chapter-content", {
        chapterTitle: chapter.title,
        chapterDescription: chapter.description,
        style: "Informative",
      });

      setValue(res.data.content);
    } catch (err) {
      console.error(err);
      alert("AI generation failed");
    } finally {
      setLoadingAI(false);
    }
  };

  // SAVE CHAPTER
  const saveChapter = async () => {
    try {
      const updatedChapters = [...chapters];

      updatedChapters[selectedChapter] = {
        ...updatedChapters[selectedChapter],
        title: title,
        content: value,
      };

      await axiosInstance.put(`/api/book/${bookId}`, {
        chapters: updatedChapters,
      });

      setChapters(updatedChapters);

      alert("Chapter saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  if (!book) return <div className="p-6">Loading...</div>;

  return (
    <div className="h-screen flex flex-col">
      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 py-3 border-b bg-white">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-600 hover:text-black"
          >
            ← Back to Dashboard
          </button>

          <button className="font-semibold border px-3 py-1 rounded">
            Editor
          </button>

          <button className="text-gray-600">Book Details</button>
        </div>

        <div className="flex gap-3">
          <button className="border px-3 py-1 rounded">Export</button>

          <button
            onClick={saveChapter}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-1">
        {/* LEFT SIDEBAR */}
        <div className="w-72 border-r bg-gray-50 p-4">
          <h3 className="font-semibold mb-4">Chapters</h3>

          <div className="space-y-2">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                onClick={() => selectChapter(index)}
                className={`p-2 rounded cursor-pointer 
                ${
                  selectedChapter === index
                    ? "bg-gray-300"
                    : "hover:bg-gray-200"
                }`}
              >
                {chapter.title}
              </div>
            ))}
          </div>

          <button className="mt-4 text-blue-600 text-sm">+ New Chapter</button>
        </div>

        {/* EDITOR AREA */}
        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Chapter Editor</h2>

          {/* TITLE */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />

          {/* BUTTONS */}
          <div className="flex justify-between mb-4">
            <div className="flex gap-3">
              <button className="border px-3 py-1 rounded">Edit</button>
              <button className="border px-3 py-1 rounded">Preview</button>
            </div>

            <button
              onClick={generateChapterAI}
              className="bg-purple-600 text-white px-4 py-1 rounded"
            >
              {loadingAI ? "Generating..." : "Generate with AI"}
            </button>
          </div>

          {/* MARKDOWN EDITOR */}
          <MDEditor value={value} onChange={setValue} height={400} />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;

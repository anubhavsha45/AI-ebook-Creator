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

  const [activeTab, setActiveTab] = useState("editor");
  const [mode, setMode] = useState("edit"); // edit | preview

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

  const selectChapter = (index) => {
    setSelectedChapter(index);
    setTitle(chapters[index].title);
    setValue(chapters[index].content || "");
  };

  // AI
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

  // Save
  const saveChapter = async () => {
    try {
      const updatedChapters = [...chapters];

      updatedChapters[selectedChapter] = {
        ...updatedChapters[selectedChapter],
        title,
        content: value,
      };

      await axiosInstance.put(`/api/book/${bookId}`, {
        chapters: updatedChapters,
      });

      setChapters(updatedChapters);
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // Export
  const exportPDF = async () => {
    try {
      const res = await axiosInstance.get(`/api/export/${bookId}/pdf`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `${book.title}.pdf`);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const exportDOC = async () => {
    try {
      const res = await axiosInstance.get(`/api/export/${bookId}/doc`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `${book.title}.docx`);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 COVER IMAGE UPLOAD FUNCTION
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("coverImage", file); // MUST match backend

      const res = await axiosInstance.put(
        `/api/book/cover/${bookId}`,
        formData,
      );

      setBook((prev) => ({
        ...prev,
        coverImage: res.data.coverImage,
      }));
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  if (!book) return <div className="p-6">Loading...</div>;

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 py-3 bg-white border-b shadow-sm">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-500 hover:text-black transition"
          >
            ← Back
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-1 rounded-lg transition ${
                activeTab === "editor"
                  ? "bg-gray-200 font-medium"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              Editor
            </button>

            <button
              onClick={() => setActiveTab("details")}
              className={`px-3 py-1 rounded-lg transition ${
                activeTab === "details"
                  ? "bg-gray-200 font-medium"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              Book Details
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={exportPDF}
            className="border px-3 py-1 rounded-lg hover:bg-gray-100 transition"
          >
            📄 PDF
          </button>

          <button
            onClick={exportDOC}
            className="border px-3 py-1 rounded-lg hover:bg-gray-100 transition"
          >
            📝 DOC
          </button>

          <button
            onClick={saveChapter}
            className="bg-blue-600 text-white px-4 py-1 rounded-lg 
            hover:bg-blue-700 transition shadow-sm"
          >
            Save
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-72 bg-white border-r p-4">
          <h3 className="font-semibold mb-4">Chapters</h3>

          <div className="space-y-1">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                onClick={() => selectChapter(index)}
                className={`p-2 rounded-lg cursor-pointer transition-all duration-200
                ${
                  selectedChapter === index
                    ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                    : "hover:bg-gray-100 hover:pl-3"
                }`}
              >
                {chapter.title}
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300">
            {activeTab === "editor" ? (
              <>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-400"
                />

                <div className="flex justify-between mb-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setMode("edit")}
                      className={`px-3 py-1 rounded-lg transition ${
                        mode === "edit"
                          ? "bg-gray-200 font-medium"
                          : "border hover:bg-gray-100"
                      }`}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setMode("preview")}
                      className={`px-3 py-1 rounded-lg transition ${
                        mode === "preview"
                          ? "bg-gray-200 font-medium"
                          : "border hover:bg-gray-100"
                      }`}
                    >
                      Preview
                    </button>
                  </div>

                  <button
                    onClick={generateChapterAI}
                    className="bg-purple-600 text-white px-4 py-1 rounded-lg 
                    hover:bg-purple-700 transition shadow-sm"
                  >
                    ⚡ {loadingAI ? "Generating..." : "Generate"}
                  </button>
                </div>

                {mode === "edit" ? (
                  <div className="border rounded-lg overflow-hidden animate-fadeIn">
                    <MDEditor value={value} onChange={setValue} height={400} />
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px] animate-fadeIn">
                    <MDEditor.Markdown source={value} />
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-6">Book Details</h2>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500">Title</label>
                    <input
                      value={book.title || ""}
                      className="w-full border rounded-lg p-3 mt-1"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">Author</label>
                    <input
                      value={book.author || ""}
                      className="w-full border rounded-lg p-3 mt-1"
                      readOnly
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-sm text-gray-500">Subtitle</label>
                    <input
                      value={book.subtitle || ""}
                      className="w-full border rounded-lg p-3 mt-1"
                    />
                  </div>
                </div>

                {/* ✅ UPDATED UPLOAD */}
                <div
                  className="mt-8 border-2 border-dashed p-6 rounded-lg text-center bg-gray-50 cursor-pointer"
                  onClick={() => document.getElementById("coverUpload").click()}
                >
                  {book.coverImage ? (
                    <img
                      src={`http://localhost:8000/${book.coverImage}`}
                      alt="cover"
                      className="mx-auto h-40 object-cover rounded"
                    />
                  ) : (
                    "Upload Cover Image"
                  )}
                </div>

                <input
                  type="file"
                  id="coverUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;

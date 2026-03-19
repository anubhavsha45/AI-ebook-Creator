import { useState, useEffect, useRef } from "react";
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
  const [mode, setMode] = useState("edit");

  const [showExport, setShowExport] = useState(false);
  const dropdownRef = useRef(null);

  const [successMsg, setSuccessMsg] = useState("");

  // ✅ Close dropdown properly
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowExport(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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

      setSuccessMsg("Saved successfully ✅");
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      console.error(err);

      setSuccessMsg("Save failed ❌");
      setTimeout(() => setSuccessMsg(""), 2000);
    }
  };

  // Export
  const exportPDF = async () => {
    const res = await axiosInstance.get(`/api/export/${bookId}/pdf`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${book.title}.pdf`);
    link.click();
  };

  const exportDOC = async () => {
    const res = await axiosInstance.get(`/api/export/${bookId}/doc`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${book.title}.docx`);
    link.click();
  };

  // Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("coverImage", file);

    const res = await axiosInstance.put(`/api/book/cover/${bookId}`, formData);

    setBook((prev) => ({
      ...prev,
      coverImage: res.data.coverImage,
    }));
  };

  if (!book) return <div className="p-6">Loading...</div>;

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* TOAST */}
      {successMsg && (
        <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm">
          {successMsg}
        </div>
      )}

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-4 md:px-6 py-3 bg-white border-b shadow-sm">
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-500 hover:text-black cursor-pointer"
          >
            ← Back
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${
                activeTab === "editor" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              Editor
            </button>

            <button
              onClick={() => setActiveTab("details")}
              className={`px-3 py-1 rounded-lg cursor-pointer ${
                activeTab === "details" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              Book Details
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex gap-2 items-center flex-wrap" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowExport((prev) => !prev);
              }}
              className="border px-3 py-1.5 rounded-lg bg-white hover:bg-gray-100 cursor-pointer"
            >
              Export ⬇
            </button>

            {showExport && (
              <div className="fixed top-16 right-4 w-44 bg-white border rounded-xl shadow-xl z-[9999]">
                <button
                  onClick={() => {
                    exportPDF();
                    setShowExport(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  📄 PDF
                </button>

                <button
                  onClick={() => {
                    exportDOC();
                    setShowExport(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  📝 DOC
                </button>
              </div>
            )}
          </div>

          <button
            onClick={saveChapter}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="md:w-72 bg-white border-r p-4 overflow-x-auto md:overflow-y-auto">
          <h3 className="font-semibold mb-4">Chapters</h3>

          <div className="flex md:flex-col gap-2">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                onClick={() => selectChapter(index)}
                className={`p-2 rounded-lg cursor-pointer whitespace-nowrap ${
                  selectedChapter === index
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                {chapter.title}
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-2 md:p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            {activeTab === "editor" ? (
              <>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-lg p-3 mb-4"
                />

                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMode("edit")}
                      className="px-3 py-1 border rounded cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setMode("preview")}
                      className="px-3 py-1 border rounded cursor-pointer"
                    >
                      Preview
                    </button>
                  </div>

                  <button
                    onClick={generateChapterAI}
                    className="bg-purple-600 text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-purple-700"
                  >
                    ⚡ {loadingAI ? "Generating..." : "Generate"}
                  </button>
                </div>

                {mode === "edit" ? (
                  <MDEditor
                    value={value}
                    onChange={setValue}
                    height={window.innerWidth < 768 ? 400 : 600}
                  />
                ) : (
                  <MDEditor.Markdown source={value} />
                )}
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-6">Book Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-500">Subtitle</label>
                    <input
                      value={book.subtitle || ""}
                      className="w-full border rounded-lg p-3 mt-1"
                    />
                  </div>
                </div>

                <div
                  className="mt-8 border-2 border-dashed p-6 rounded-lg text-center bg-gray-50 cursor-pointer"
                  onClick={() => document.getElementById("coverUpload").click()}
                >
                  {book.coverImage ? (
                    <img
                      src={`https://ai-ebook-creator-qkj3.onrender.com/${book.coverImage}`}
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

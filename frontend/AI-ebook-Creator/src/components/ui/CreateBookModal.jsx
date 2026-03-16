import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
const CreateBookModal = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [title, setTitle] = useState("");
  const [chaptersCount, setChaptersCount] = useState(5);
  const [style, setStyle] = useState("Informative");
  const [chapters, setChapters] = useState([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Generate AI outline
  const generateOutline = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.post("/api/ai/generate-outline", {
        topic: title,
        numChapters: chaptersCount,
        style,
        description: "",
      });

      setChapters(res.data.outline);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("AI outline generation failed");
    }

    setLoading(false);
  };

  // Delete chapter
  const deleteChapter = (index) => {
    const updated = chapters.filter((_, i) => i !== index);
    setChapters(updated);
  };

  // Create book
  const createBook = async () => {
    try {
      const res = await axiosInstance.post("/api/book", {
        title,
        author: user?.name,
        chapters,
      });
      const bookId = res.data._id || res.data.book?._id;
      navigate(`/editor/${bookId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      {/* HEADER */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Create New eBook</h2>

        {/* STEP INDICATOR */}

        <div className="flex items-center mt-4">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm 
          ${step === 1 ? "bg-violet-600" : "bg-green-500"}`}
          >
            ✓
          </div>

          <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>

          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm 
          ${step === 2 ? "bg-violet-600 text-white" : "bg-gray-200"}`}
          >
            2
          </div>
        </div>
      </div>

      {/* STEP 1 */}

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Book Title</label>

            <input
              className="w-full mt-1 border rounded-lg px-3 py-2"
              placeholder="Enter your book title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Number of Chapters</label>

            <input
              type="number"
              className="w-full mt-1 border rounded-lg px-3 py-2"
              value={chaptersCount}
              onChange={(e) => setChaptersCount(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Writing Style</label>

            <select
              className="w-full mt-1 border rounded-lg px-3 py-2"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option>Informative</option>
              <option>Storytelling</option>
              <option>Professional</option>
              <option>Educational</option>
            </select>
          </div>

          <button
            onClick={generateOutline}
            className="w-full mt-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90"
          >
            {loading ? "Generating..." : "Generate Outline with AI"}
          </button>
        </div>
      )}

      {/* STEP 2 */}

      {step === 2 && (
        <div>
          <h3 className="font-semibold mb-3">Review Chapters</h3>

          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 flex justify-between gap-3"
              >
                <div>
                  <p className="font-medium">{chapter.title}</p>

                  <p className="text-sm text-gray-500">{chapter.description}</p>
                </div>

                <button
                  onClick={() => deleteChapter(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button onClick={() => setStep(1)} className="text-gray-500">
              ← Back
            </button>

            <button
              onClick={createBook}
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2 rounded-lg"
            >
              Create eBook
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreateBookModal;

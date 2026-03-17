import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import CreateBookModal from "../components/ui/CreateBookModal";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const DashboardPage = () => {
  const [books, setBooks] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get("/api/book");
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 🗑 DELETE BOOK
  const deleteBook = async (id) => {
    try {
      await axiosInstance.delete(`/api/book/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All eBooks</h1>

            <p className="text-gray-500 text-sm">
              Create, edit, and manage your AI-generated eBooks.
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-violet-600 hover:bg-violet-700 
            text-white px-5 py-2 rounded-lg transition shadow-sm"
          >
            + Create New eBook
          </button>
        </div>

        {/* 🔥 EMPTY STATE */}
        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-24">
            <div className="text-6xl mb-4">✨</div>

            <h2 className="text-2xl font-semibold text-gray-800">
              No eBooks yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md">
              You haven't created any eBooks yet. Let AI generate something
              amazing for you 🚀
            </p>

            <button
              onClick={() => setOpenModal(true)}
              className="mt-6 bg-violet-600 hover:bg-violet-700 
              text-white px-6 py-2 rounded-lg shadow-md 
              hover:scale-105 transition"
            >
              Create Your First eBook
            </button>
          </div>
        ) : (
          /* GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                onClick={() => navigate(`/view-book/${book._id}`)}
                className="relative group rounded-xl overflow-hidden shadow-md 
                hover:shadow-2xl transition duration-300 aspect-[3/4] cursor-pointer"
              >
                {/* IMAGE */}
                <img
                  src={
                    book.coverImage
                      ? `http://localhost:8000/${book.coverImage}`
                      : "https://via.placeholder.com/300x400?text=No+Cover"
                  }
                  alt={book.title}
                  className="w-full h-full object-cover 
                  group-hover:scale-105 transition duration-300"
                />

                {/* OVERLAY */}
                <div
                  className="absolute inset-0 bg-black/30 opacity-0 
                group-hover:opacity-100 transition"
                ></div>

                {/* TEXT */}
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className="text-sm opacity-80">{book.author}</p>
                </div>

                {/* ACTION BUTTONS */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-3 right-3 opacity-0 
                  group-hover:opacity-100 transition flex gap-2 z-20"
                >
                  <button
                    onClick={() => navigate(`/editor/${book._id}`)}
                    className="bg-white/90 backdrop-blur p-2 rounded-md 
                    shadow hover:scale-110 transition"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => deleteBook(book._id)}
                    className="bg-white/90 backdrop-blur p-2 rounded-md 
                    shadow hover:scale-110 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <CreateBookModal open={openModal} setOpen={setOpenModal} />
    </div>
  );
};

export default DashboardPage;

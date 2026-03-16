import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import CreateBookModal from "../components/ui/CreateBookModal";

const DashboardPage = () => {
  const [books, setBooks] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold">All eBooks</h1>

            <p className="text-gray-500 text-sm">
              Create, edit, and manage your AI-generated eBooks.
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg"
          >
            + Create New eBook
          </button>
        </div>

        {/* BOOK GRID */}

        <div className="grid grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="relative group rounded-xl overflow-hidden shadow-md aspect-[3/4]"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">{book.title}</h3>

                <p className="text-sm opacity-80">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateBookModal open={openModal} setOpen={setOpenModal} />
    </div>
  );
};

export default DashboardPage;

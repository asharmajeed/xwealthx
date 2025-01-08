import React, { useState, useEffect } from "react";

const AdminFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [deletingFiles, setDeletingFiles] = useState({});

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage(""); // Clear previous messages
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);
      const response = await fetch("https://xwealthx.vercel.app/api/files/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("File uploaded successfully!");
        setSelectedFile(null);
        const updatedFiles = await fetch("https://xwealthx.vercel.app/api/files");
        if (updatedFiles.ok) {
          const data = await updatedFiles.json();
          setFiles(data);
        } else {
          console.error("Failed to refetch files after uploading.");
        }
      } else {
        setMessage("Failed to upload the file. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingFiles((prevState) => ({
      ...prevState,
      [id]: true, // Set the deleting state for the specific file
    }));
    try {
      const response = await fetch(`https://xwealthx.vercel.app/api/files/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedFiles = await fetch("https://xwealthx.vercel.app/api/files");
        if (updatedFiles.ok) {
          const data = await updatedFiles.json();
          setFiles(data);
        } else {
          console.error("Failed to refetch files after deletion.");
        }
      } else {
        const error = await response.json();
        console.error(error.error);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setDeletingFiles((prevState) => ({
        ...prevState,
        [id]: false, // Reset the deleting state for the specific file
      }));
    }
  };

  // Fetch files from the backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("https://xwealthx.vercel.app/api/files");
        if (response.ok) {
          const data = await response.json();
          setFiles(data);
        } else {
          console.error("Failed to fetch files.");
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="p-2 md:p-4">
      <h1 className="text-3xl font-semibold mb-4 text-blue-900">
        Add Case Studies
      </h1>
      <div className="flex flex-col items-center gap-10 min-h-screen bg-gray-100 px-2 md:px-0">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Admin File Upload
          </h2>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 mb-4"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`w-full py-2 px-4 text-white font-bold rounded ${
              uploading
                ? "bg-pink-400 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
          {message && (
            <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
          )}
        </div>
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
          {files.length === 0 ? (
            <p className="text-center text-gray-600">No case study added.</p>
          ) : (
            <ul className="space-y-4">
              {files.map((file) => (
                <li key={file._id} className="flex items-center space-x-4">
                  <span className="flex-1 text-gray-700 truncate">
                    {file.name}
                  </span>
                  <button
                    onClick={() => handleDelete(file._id)}
                    disabled={deletingFiles[file._id]}
                    className="px-4 py-2 bg-pink-500 text-white font-bold rounded hover:bg-pink-600"
                  >
                    {deletingFiles[file._id] ? "Deleting..." : "Delete"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFileUpload;

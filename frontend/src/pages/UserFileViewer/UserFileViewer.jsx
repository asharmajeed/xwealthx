import React, { useEffect, useState } from "react";

const UserFileViewer = () => {
  const [files, setFiles] = useState([]);

  // Fetch files from the backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/files");
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4 text-blue-900">
        Case Studies
      </h1>
      <div className="w-full max-w-4xl p-6">
        {files.length === 0 ? (
          <p className="text-center text-gray-500">No case studies available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {files.map((file) => (
              <div
                key={file._id}
                className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              >
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-gray-800 font-semibold truncate w-full"
                >
                  {file.name}
                </a>
                <div className="mt-4">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-colors duration-300"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFileViewer;

import { useState } from "react";
import axios from "../utils/axios";

export default function UploadProjectModal({ setOpen }) {
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    // Form Validation
    if (!formData.project_name) {
      alert("Project name is required.");
      return;
    }
    
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("project_name", formData.project_name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("file", file);

      await axios.post("/upload-project", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      alert("Project uploaded successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error uploading project:", error);
      alert(error.response?.data?.error || "Failed to upload project");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">Upload Source Code Project</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="project_name"
            placeholder="Project Name"
            value={formData.project_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Project Description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
          <div className="border-2 border-dashed border-gray-300 rounded p-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full"
              accept=".py,.js,.java,.cpp,.c,.html,.css,.jsx,.ts,.tsx,.go,.rb,.php,.swift,.kt,.rs,.zip,.tar,.gz"
            />
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => {
                setOpen(false);
                setFormData({
                  project_name: "",
                  description: "",
                });
                setFile(null);
              }}
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
              onClick={handleSubmit}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

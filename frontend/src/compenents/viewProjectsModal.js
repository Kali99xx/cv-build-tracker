import { useState, useEffect } from "react";
import axios from "../utils/axios";

export default function ViewProjectsModal({ setOpen }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/get-projects");
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert("Failed to fetch projects");
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await axios.delete(`/delete-project/${projectId}`);
      alert("Project deleted successfully!");
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(error.response?.data?.error || "Failed to delete project");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[800px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">My Projects</h2>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No projects uploaded yet.
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {project.project_name}
                    </h3>
                    {project.description && (
                      <p className="text-gray-600 mt-1">{project.description}</p>
                    )}
                    <div className="mt-2 text-sm text-gray-500">
                      <p>File: {project.file_name}</p>
                      <p>Size: {(project.file_size / 1024).toFixed(2)} KB</p>
                      <p>
                        Uploaded: {new Date(project.created_at).toLocaleDateString()}
                      </p>
                      <p>User: {project.user}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

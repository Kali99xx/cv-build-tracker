import { useState } from "react";
import axios from "../utils/axios";

export default function AddTechInfoForm({setOpen}) {
  const [formData, setFormData] = useState({
    company_name: "",
    company_url: "",
    job_role: "",
    job_des: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Form Validation
    if (!formData.company_name || !formData.company_url || !formData.job_role || !formData.job_des) {
      alert("All fields are required.");
      return;
    }
    try {
      await axios.post("/add-tech-info", formData);
      alert("Tech info added successfully!");
    } catch (error) {
      console.error("Error adding tech info:", error);
      alert("Failed to add tech info");
    }
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">Add Tech Info</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="company_name"
            placeholder="Company Name"
            value={formData.company_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="company_url"
            placeholder="Company URL"
            value={formData.company_url}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="job_role"
            placeholder="Job Role"
            value={formData.job_role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="job_des"
            placeholder="Job Description"
            value={formData.job_des}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => {
                setOpen(false);
                setFormData({
                  company_name: "",
                  company_url: "",
                  job_role: "",
                  job_des: "",
                });
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

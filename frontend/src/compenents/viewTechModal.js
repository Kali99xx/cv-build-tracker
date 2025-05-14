import { useState, useEffect } from "react";
import axios from "../utils/axios";

export default function TechInfoModal({ setOpen }) {
  const [techData, setTechData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTechData = async () => {
      try {
        const response = await axios.get("/get-tech-info");
        setTechData(response.data);
      } catch (error) {
        console.error("Error fetching tech info:", error);
      }
    };
    fetchTechData();
  }, []);

  const filteredData = techData.filter((item) =>
    [item.company_name, item.job_role, item.video_source]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tech Information</h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by Company, Role, or Video Source"
          className="w-full p-2 mb-4 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">No</th>
                <th className="p-2 border">Company</th>
                <th className="p-2 border">URL</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Video Source</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id} className="text-center border-b">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{item.company_name}</td>
                  <td className="p-2 border">
                    <a
                      href={item.company_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Link
                    </a>
                  </td>
                  <td className="p-2 border">{item.job_role}</td>
                  <td className="p-2 border">{item.video_source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

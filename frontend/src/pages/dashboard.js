import React, { useState, useEffect } from "react";
import StepTabs from "../compenents/StepTabs";
import ItemChart from "../compenents/ItemChart";
import { useDispatch, useSelector } from "react-redux";
import { loadInfo } from "../actions/trackAction";
import { useNavigate } from "react-router-dom";
// import { fetchItemCounts } from '../services/api';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadInfo()); // ✅ Pass Token & User ID
  }, []);

  const steps = useSelector((state) => state.track.steps) || [];
  const items = useSelector((state) => state.track.items);
  const [selectedStep, setSelectedStep] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (steps.length > 0 && items.length > 0) {
      setSelectedStep(steps[0]);
      setLoading(false);
    }
  }, [steps]);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    dispatch({
      type: "LOGOUT",
    });
    // Navigate to the login page
    navigate("/login"); // Change '/login' to your login route
  };
  //   useEffect(() => {
  //     const loadData = async () => {
  //       try {
  //         const result = await fetchItemCounts(selectedStep);
  //         setSteps(result.steps); // Assume the backend returns steps array
  //         setSelectedStep(result.steps[0]); // Set default selected step
  //         setItems(result.items); // Set items for the first step
  //         setLoading(false);
  //       } catch (error) {
  //         console.error('Error loading dashboard data:', error);
  //         setLoading(false);
  //       }
  //     };

  //     if (selectedStep) {
  //       loadData();
  //     }
  //   }, [selectedStep]);

  const handleStepSelect = (step) => {
    setSelectedStep(step);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-screen overflow-auto">
      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation Buttons */}
        <div className="flex flex-row w-full justify-end">
          <div
            className="h-[50px] w-[100px] bg-blue-500 rounded-[20px] p-2 min-w-max"
            onClick={() => navigate("/tracker")}
          >
            <div className="text-[white] flex items-center justify-center h-full font-semibold cursor-pointer">
              Tracker
            </div>
          </div>
          <div
            className="h-[50px] w-[100px] bg-black rounded-[20px] p-2 min-w-max ml-4 mr-4"
            onClick={handleLogout}
          >
            <div className="text-[white] flex items-center justify-center h-full font-semibold cursor-pointer">
              LogOut
            </div>
          </div>
        </div>

        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold mb-6">Real-Time Dashboard</h1>

        {/* Two Column Layout */}
        <div className="flex flex-row gap-6 mt-6">
          {/* Left Side: StepTabs + ItemChart */}
          <div className="w-full md:w-1/2">
            <StepTabs
              steps={steps}
              selectedStep={selectedStep}
              onSelect={handleStepSelect}
            />
            <ItemChart items={items} step={selectedStep} />
          </div>

          {/* Right Side: "Total Count for Today" + ItemChart */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="p-4 bg-white rounded-lg shadow-md mb-4">
              <h3 className="text-xl font-semibold text-center">
                Total Count for Today
              </h3>
            </div>
            <ItemChart items={items} step="total" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

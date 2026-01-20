import TrackModal from "../../compenents/modal";
import AddTechInfoForm from "../../compenents/addTechModal";
import UploadProjectModal from "../../compenents/uploadProjectModal";
import ViewProjectsModal from "../../compenents/viewProjectsModal";
import { useState, useEffect } from "react";
import Kanban from "../../compenents/kanban";
import { useDispatch, useSelector } from "react-redux";
import { loadInfo } from "../../actions/trackAction";
import Loader from "../../compenents/loader";
import ViewTechInfoForm from "../../compenents/viewTechModal";
import { useNavigate } from "react-router-dom";

const Tracker = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadInfo()); // ✅ Pass Token & User ID
  }, []);

  const [params, setParams] = useState({
    company_name: "",
    status: [],
    name: [],
    site: [],
    step: [],
    job_des: "",
    contact: {
      name: "",
      date: "",
      time: "",
      phone: "",
      method: [],
    },
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAddTechModal, setIsOpenAddTechModal] = useState(false);
  const [isOpenViewTechModal, setIsOpenViewTechModal] = useState(false);
  const [isOpenUploadProjectModal, setIsOpenUploadProjectModal] = useState(false);
  const [isOpenViewProjectsModal, setIsOpenViewProjectsModal] = useState(false);
  const IsLoading = useSelector((state) => state.track.load);
  const steps = useSelector((state) => state.track.steps) || [];
  const account_types = useSelector((state) => state.track.account_types) || [];
  const account_users = useSelector((state) => state.track.account_users) || [];
  const contacts = ["Email", "Job site", "Phone"];
  useEffect(() => {
    if (
      steps.length > 0 &&
      account_types.length > 0 &&
      account_users.length > 0
    ) {
      setParams({
        company_name: "",
        status: steps[0],
        name: account_users[0],
        site: account_types[0],
        step: [],
        job_des: "",
        contact: {
          name: "",
          date: "",
          time: "",
          phone: "",
          method: contacts[0],
        },
      });
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
  return (
    <div className="w-full h-full">
      {IsLoading ? (
        <div className="bg-[#F0EEEB] w-full h-full flex flex-col gap-8">
          <div className="flex flex-row gap-[80px] w-full h-full bg-hsl(40 22% 94% / var(--tw-bg-opacity))">
            <div className="flex flex-col w-full">
              <div className="flex flex-row w-full mt-[30px] h-[80px] gap-[20px]">
                <div className="shadow-md h-full w-full rounded-[20px] bg-white flex flex-row items-center gap-[40px]">
                  <div className="font-bold text-[30px] ml-[40px] min-w-max">
                    JOB TRACKER
                  </div>
                  <div
                    className="h-[50px] w-[250px] p-2 bg-black rounded-[20px] min-w-max"
                    onClick={() => setIsOpenModal(true)}
                  >
                    <div className="text-[white] flex items-center justify-center h-full font-semibold cursor-pointer">
                      + ADD ITEM
                    </div>
                  </div>
                  <div
                    className="h-[50px] w-[250px] p-2 bg-black rounded-[20px] min-w-max"
                    onClick={() => setIsOpenAddTechModal(true)}
                  >
                    <div className="text-[white] flex items-center justify-center h-full font-semibold cursor-pointer">
                      ADD TECH INFO
                    </div>
                  </div>
                  <div
                    className="h-[50px] w-[250px] p-2 bg-black rounded-[20px] min-w-max"
                    onClick={() => setIsOpenViewTechModal(true)}
                  >
                    <div className="text-[white] flex items-center justify-center h-full font-semibold cursor-pointer">
                      VIEW TECH INFO
                    </div>
                  </div>
                  <div
                    className="h-[50px] w-[250px] p-2 bg-green-600 rounded-[20px] min-w-max"
                    onClick={() => setIsOpenUploadProjectModal(true)}
                  >
                    <div className="text-[white] flex items-center justify-center h-full font-semibold cursor-pointer">
                      UPLOAD PROJECT
                    </div>
                  </div>
                  <div
                    className="h-[50px] w-[250px] p-2 bg-purple-600 rounded-[20px] min-w-max"
                    onClick={() => setIsOpenViewProjectsModal(true)}
                  >
                    <div className="text-[white] flex items-center justify-center h-full font-semibold cursor-pointer">
                      VIEW PROJECTS
                    </div>
                  </div>

                  <div className="w-full"></div>
                  <div
                    className="h-[50px] w-[150px] bg-lime-500 rounded-[20px] p-2 min-w-max"
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    <div className="text-[white] flex items-center justify-center h-full font-semibold cursor-pointer">
                      Dashboard
                    </div>
                  </div>
                  <div
                    className="h-[50px] w-[150px] bg-black rounded-[20px] p-2 min-w-max mr-4"
                    onClick={handleLogout}
                  >
                    <div className="text-[white] flex items-center justify-center h-full font-semibold cursor-pointer">
                      LogOut
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-full overflow-auto">
                <Kanban />
              </div>
            </div>
          </div>
          {isOpenModal && (
            <TrackModal
              type="ADD_TRACK"
              setOpen={setIsOpenModal}
              params={params}
              setParams={setParams}
            />
          )}
          {isOpenAddTechModal && (
            <AddTechInfoForm setOpen={setIsOpenAddTechModal} />
          )}
          {isOpenViewTechModal && (
            <ViewTechInfoForm setOpen={setIsOpenViewTechModal} />
          )}
          {isOpenUploadProjectModal && (
            <UploadProjectModal setOpen={setIsOpenUploadProjectModal} />
          )}
          {isOpenViewProjectsModal && (
            <ViewProjectsModal setOpen={setIsOpenViewProjectsModal} />
          )}
          +
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Tracker;

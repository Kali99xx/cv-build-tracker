import Combobox from "./combobox";
import Todos from "./todos";
import { Tabs, Tab } from "./tabs";
import { useSelector, useDispatch } from "react-redux";
import { handleTrack } from "../actions/trackAction";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const TrackModal = ({ type, setOpen, params, setParams }) => {
  const steps = useSelector((state) => state.track.steps);
  const items = useSelector((state) => state.track.items);
  const account_types = useSelector((state) => state.track.account_types);
  const account_users = useSelector((state) => state.track.account_users);
  // const contacts = ["Email", "Job site", "Phone"];
  const dispatch = useDispatch();

  console.log(params.status)
  const isFormValid = () => {
    return (
      params.company_name &&
      params.content &&
      params.step
    );
  };
  const handleSave = () => {
    setOpen(false);
    const col_idx = steps.indexOf(params.status);
    console.log(params);
    const newParams = {
      ...params,
    };
    // console.log(params);
    if (type === "ADD_TRACK") {
      // console.log(col_idx);
      newParams["col_idx"] = col_idx;
      // console.log(newParams);
      newParams["row_idx"] =
        items[col_idx] &&
        items[col_idx].items &&
        items[col_idx].items.length > 0
          ? Math.max(...items[col_idx].items.map((item) => item.row_idx)) + 1
          : 0;
    }
    dispatch(handleTrack({ type, params: newParams }));
  };

  const handleDelete = () => {
    dispatch(handleTrack({ type: "DELETE_TRACK", params: params }));
    setOpen(false);
  };

  const handleFailed = () => {};

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
            <div className="bg-white px-8 pb-4 pt-10 flex flex-col gap-[20px]">
              <div className="flex flex-row gap-[20px]">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={params.company_name}
                  onChange={(e) => {
                    setParams((prevContent) => ({
                      ...prevContent,
                      company_name: e.target.value,
                    }));
                  }}
                  className="bg-transparen w-[150px] text-gray-900 placeholder-gray-500 text-[20px] font-bold focus:outline-none focus:ring-0 rounded-lg"
                  autoFocus
                />
                <Combobox
                  items={account_users}
                  item="name"
                  width="w-32"
                  initialValue={account_users[0]}
                  setParams={setParams}
                />
                <Combobox
                  items={account_types}
                  item="site"
                  width="w-32"
                  initialValue={account_types[0]}
                  setParams={setParams}
                />
                {/* <Combobox
                  initialValue={params.status}
                  items={steps}
                  width="w-40"
                  item="status"
                  setParams={setParams}
                /> */}
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={handleDelete}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 17"
                    className="w-[1.4em]"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13.38 7.258s-.361 4.49-.571 6.382c-.1.903-.658 1.432-1.572 1.449-1.74.031-3.481.033-5.22-.003-.88-.018-1.428-.554-1.526-1.442-.211-1.908-.571-6.386-.571-6.386M14.302 5.106H2.997M12.124 5.106c-.523 0-.974-.37-1.076-.883l-.162-.81a.853.853 0 00-.825-.633H7.24a.853.853 0 00-.825.632l-.162.811a1.099 1.099 0 01-1.076.883"
                    ></path>
                  </svg>
                </div>
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={handleFailed}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                </div>
              </div>
              {/* <div className="mt-[20px]">
                <p className="font-bold text-[20px]"> Interview Steps</p>
                <Todos setParams={setParams} />
              </div> */}
              <div className="min-h-[400px]">
                <Tabs>
                  <Tab label="Content">
                    <textarea
                      id="message"
                      className="block w-full h-[350px] text-sm text-gray-900 py-3 px-2 text-[17px] border-none focus:outline-none resize-none"
                      value={params.content}
                      onChange={(e) => {
                        setParams((prevContent) => ({
                          ...prevContent,
                          content: e.target.value,
                        }));
                      }}
                    ></textarea>
                    {/* <div className="flex flex-row w-full m-7 gap-10">
                      <Combobox
                        items={contacts}
                        width="w-32"
                        item="contact"
                        setParams={setParams}
                      />
                    </div>
                    <div className="flex flex-col gap-[30px] justify-between m-7">
                      <input
                        type="text"
                        placeholder="Client Name"
                        value={params.contact.name}
                        onChange={(e) => {
                          setParams((prevContent) => ({
                            ...prevContent,
                            contact: {
                              ...prevContent.contact,
                              name: e.target.value,
                            },
                          }));
                        }}
                        className="w-32 bg-transparen  text-gray-900 placeholder-gray-500 text-[17px] focus:outline-none focus:ring-0 rounded-md"
                        autoFocus
                      />
                      <input
                        type="date"
                        placeholder="Date"
                        value={params.contact.date}
                        onChange={(e) => {
                          setParams((prevContent) => ({
                            ...prevContent,
                            contact: {
                              ...prevContent.contact,
                              date: e.target.value,
                            },
                          }));
                        }}
                        className="w-32 bg-transparen  text-gray-900 placeholder-gray-500 text-[17px] focus:outline-none focus:ring-0 rounded-md"
                        autoFocus
                      />
                      <input
                        type="text"
                        placeholder="time and timezone"
                        value={params.contact.time}
                        onChange={(e) => {
                          setParams((prevContent) => ({
                            ...prevContent,
                            contact: {
                              ...prevContent.contact,
                              time: e.target.value,
                            },
                          }));
                        }}
                        className="w-32 bg-transparen  text-gray-900 placeholder-gray-500 text-[17px] focus:outline-none focus:ring-0 rounded-md"
                        autoFocus
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={params.contact.phone}
                        onChange={(e) => {
                          setParams((prevContent) => ({
                            ...prevContent,
                            contact: {
                              ...prevContent.contact,
                              phone: e.target.value,
                            },
                          }));
                        }}
                        className="w-32 bg-transparen text-gray-900 placeholder-gray-500 text-[17px] focus:outline-none focus:ring-0 rounded-md"
                      />
                    </div> */}
                  </Tab>
                  <Tab label="Job Description">
                    <textarea
                      id="message"
                      className="block w-full h-[350px] text-sm text-gray-900 py-3 px-2 text-[17px] border-none focus:outline-none resize-none"
                      value={params.job_des}
                      onChange={(e) => {
                        setParams((prevContent) => ({
                          ...prevContent,
                          job_des: e.target.value,
                        }));
                      }}
                    ></textarea>
                  </Tab>
                </Tabs>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className={`inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto
                ${
                  isFormValid()
                    ? "bg-blue-500 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isFormValid()}
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => {
                  setOpen(false);
                  setParams(params);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackModal;

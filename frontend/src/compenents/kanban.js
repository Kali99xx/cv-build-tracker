import React, { useState, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { StatusStep, EditStep } from "./step";
import { useDispatch, useSelector } from "react-redux";
import useClickOutside from "../utils/useClickOutside";
import { updateTrackPos } from "../actions/trackAction";
import TrackModal from "./modal";
const onDragEnd = (result, dispatch) => {
  const { source, destination } = result;
  if (!destination) return;
  const startColumn = source.droppableId; // Starting column ID
  const startIndex = source.index; // Starting index within the column
  const endColumn = destination.droppableId; // Ending column ID
  const endIndex = destination.index; // Ending index within the column

  console.log("Drag started at column:", startColumn, "index:", startIndex);
  console.log("Dropped at column:", endColumn, "index:", endIndex);

  // Dispatch the update action to reflect the new state
  dispatch(updateTrackPos(source, destination));
};
const formattedDate = (d) => {
  const date = new Date(d);
  const formattedDate = date.toISOString().split("T")[0]; // Extracts YYYY-MM-DD
  return formattedDate
}
const Kanban = () => {
  const dispatch = useDispatch();
  const stepRef = useRef(null);

  useClickOutside(stepRef, () => setIsAddStep(false));
  const items = useSelector((state) => state.track.items);
  // console.log("--------Items:", items)
  const steps = useSelector((state) => state.track.steps);
  const [isAddStep, setIsAddStep] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [params, setParams] = useState([]);
  const handleEditTrack = (track) => {
    const newTrack = { ...track };
    newTrack["status"] = steps[track.col_idx];
    setIsOpenModal(true);
    setParams(newTrack);
  };

  return (
    <div className="flex flex-row gap-[25px] w-full h-full">
      <div className="flex flex-row h-full gap-[30px]">
        <DragDropContext onDragEnd={(result) => onDragEnd(result, dispatch)}>
          {steps.map((status, statusIndex) => (
            <div
              className="flex flex-col items-center w-[250px] h-full"
              key={statusIndex}
            >
              <StatusStep name={status} />
              <div className="m-2 w-full h-full">
                <Droppable droppableId={String(statusIndex)} key={statusIndex}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`p-1  h-full ${
                        snapshot.isDraggingOver
                          ? "bg-gray-100"
                          : "bg-light-blue-200"
                      }`}
                    >
                      {items.length > 0 && items[statusIndex] && 
                        items[statusIndex].items.map((item, index) => (
                          <Draggable
                            key={String(item.col_idx) + String(item.row_idx)}
                            draggableId={
                              String(item.col_idx) + String(item.row_idx)
                            }
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="select-none shadow-md p-4 mb-4 min-h-[50px] font-semibold rounded-[10px] text-[17px] bg-white"
                                style={provided.draggableProps.style}
                                onClick={() => handleEditTrack(item)}
                              >
                                <p className="text-[15px] font-bold">{item.company_name}: {item.user}({item.name})</p>
                                <p className="text-[15px] font-bold">{formattedDate(item.updated_at)}</p>
                                {/* <p className="text-[15px] font-bold">{item.user}({item.name}) - {item.site}</p>
                                <p className="text-[14px] mb-1 mt-1">Company: {item.company_name}</p>
                                <p className="text-[14px] mt-1">Content:</p>
                                <p className="text-[12px]">{item.content}</p> */}
                                {/* {item.contact.date} : {item.contact.time} -
                                {item.company_name === ""
                                  ? "XXXX"
                                  : item.company_name}{" "}
                                - {item.name} - {item.site} */}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </DragDropContext>
      </div>
      {isOpenModal && (
        <TrackModal
          type="UPDATE_TRACK"
          setOpen={setIsOpenModal}
          params={params}
          setParams={setParams}
        />
      )}
      {isAddStep ? (
        <div ref={stepRef} className="w-[250px] h-full">
          <EditStep
            type="ADD_TITLE"
            pre_step=""
            setIsAddStep={setIsAddStep}
          />
        </div>
      ) : (
        <div
          className="h-[50px] min-w-[150px] bg-black rounded-[20px]"
          onClick={() => setIsAddStep(true)}
        >
          <div className="text-[white] flex items-center justify-center h-full font-semibold cursor-pointer">
            + ADD STEP
          </div>
        </div>
      )}
    </div>
  );
};

export default Kanban;

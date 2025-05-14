import React from "react";
// import TrackModal from "../../compenents/modal";
// import { useState, useEffect } from "react";
// import Kanban from "../../compenents/kanban";
// import { useDispatch, useSelector } from "react-redux";
// import { loadTitle, loadTrack } from "../../actions/trackAction";
// import Loader from "../../compenents/loader";
// import { Link } from "react-router-dom";

export const Resume = () => {
    return (
        <div>

        </div>
    );
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(loadTitle());
//     dispatch(loadTrack());
//   }, [dispatch]);
//   const [params, setParams] = useState();
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const IsLoading = useSelector((state) => state.track.load);
//   const titles = useSelector((state) => state.track.titles);
//   const names = ["Marcel", "Rio", "Ricardo"];
//   const sites = ["Linkedin", "Djinni", "Dice", "Indeed", "Not sure"];
//   const contacts = ["Email", "Job site", "Phone"];
//   useEffect(() => {
//     setParams({
//       status: titles[0],
//       company_name: "",
//       name: names[0],
//       site: sites[0],
//       step: [],
//       job_des: "",
//       contact: { name: "", phone: "", method: contacts[0] },
//     });
//   }, [titles]);

//   return (
//     <div className="w-full h-full">
//       {IsLoading ? (
//         <div className="bg-[#F0EEEB] w-full h-full px-[20px] flex flex-col gap-8">
//           <div className="flex flex-row gap-[80px]">
//             <div className="flex flex-col w-full">
//               <div className="flex flex-col mt-[30px] pt-[20px] h-[120px] gap-[20px] items-center">
//                 <div className="shadow-md h-full w-2/3 rounded-[20px] bg-white flex flex-col items-left gap-[20px]">
//                   <div className="font-bold text-[30px] ml-[40px]">
//                     Start building a resume
//                   </div>
//                   <div className="font-bold text-[20px] ml-[40px]">
//                     Your first resume – 100% free, all design features,
//                     unlimited downloads – yes really.
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* {isOpenModal && (
//             <TrackModal
//               type="ADD_TRACK"
//               setOpen={setIsOpenModal}
//               params={params}
//               setParams={setParams}
//             />
//           )} */}
//         </div>
//       ) : (
//         <Loader />
//       )}
//     </div>
//   );
};

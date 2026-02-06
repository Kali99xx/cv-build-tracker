import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="w-full h-full">
      <div className="bg-[#F0EEEB] w-full h-full flex flex-col gap-8 ">
        <div className="flex flex-row gap-[80px] w-full h-full bg-hsl(40 22% 94% / var(--tw-bg-opacity)) items-center justify-center py-[200px]">
          {/* First Div */}
          <div
            className=" shadow-md h-full w-[600px] rounded-[20px] bg-hsl(40 22% 89% / var(--tw-bg-opacity)) cursor-pointer flex flex-col justify-center items-center gap-20 "
            style={{ backgroundColor: "#F5F3EF" }}
          >
            {/* Icon Section */}
            <div className="flex flex-row gap-10 mt-[20px]">
              <svg
                viewBox="0 0 67 87"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[38px]"
              >
                <path
                  d="M54.7641 29.9408C54.4229 29.9408 54.4229 29.9408 54.7641 29.9408L30.1993 43.929C30.1993 43.929 30.1993 43.929 29.8582 43.929L28.4935 41.882C28.4935 41.882 28.4935 41.882 28.4935 41.5408L61.2464 22.7761C62.2699 22.0937 62.6111 20.729 61.9288 20.0467L50.6699 0.599609H50.3288L6.99935 25.5055C0.85817 29.2584 -1.53007 37.1055 2.22288 43.5879L25.0817 83.1643V82.8232C23.3758 79.7526 24.7405 75.9996 27.4699 74.2937L42.1405 65.7643C53.0582 59.282 55.4464 58.2584 65.3405 52.4584C66.3641 51.7761 66.7052 50.4114 66.0229 49.729C63.6346 45.2937 57.8346 35.3996 54.7641 29.9408Z"
                  fill="url(#paint0_linear_501_16469GzrIXoZFVTFSnaB5vhDUl)"
                ></path>
                <path
                  d="M27.4996 74.2775C24.429 75.9833 23.276 79.9883 24.9819 83.0589C26.6877 86.1295 30.4407 87.153 33.5113 85.4472L47.8047 77.2189C47.8047 77.2189 47.9531 77.1017 47.8407 76.9178L41.7979 65.9272L27.4996 74.2775Z"
                  fill="url(#paint1_linear_501_16469GzrIXoZFVTFSnaB5vhDUl)"
                ></path>
                <defs>
                  <linearGradient
                    id="paint0_linear_501_16469GzrIXoZFVTFSnaB5vhDUl"
                    x1="10.245"
                    y1="57.4048"
                    x2="65.3081"
                    y2="25.5939"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F857A6"></stop>
                    <stop offset="1" stopColor="#FF5858"></stop>
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_501_16469GzrIXoZFVTFSnaB5vhDUl"
                    x1="18.3761"
                    y1="72.1751"
                    x2="54.5398"
                    y2="80.7939"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4E037A"></stop>
                    <stop offset="0.3515" stopColor="#2B0B3C"></stop>
                    <stop offset="1" stopColor="#9400D3"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <h1 className="text-gray-800 font-bold text-[30px] pt-[8px]">
                Job Hunting
              </h1>
            </div>
            {/* Buttons Section */}
            <div className="flex flex-col text-center mt-2 gap-5">
              <Link
                to="/resume"
                className="py-2.5 px-5 me-2 mb-2 text-[20px] font-medium text-gray-900 focus:outline-none bg-cream rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Resume
              </Link>
              <Link
                to="/tracker"
                className="py-2.5 px-5 me-2 mb-2 text-[20px] font-medium text-gray-900 focus:outline-none bg-cream rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Job Tracker
              </Link>
              <Link
                to="/projects"
                className="py-2.5 px-5 me-2 mb-2 text-[20px] font-medium text-gray-900 focus:outline-none bg-cream rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Upload Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

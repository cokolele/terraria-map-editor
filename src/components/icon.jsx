import React from "react";

const AccountBoxIcon = ({ size=24 }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={"0 0 24 24"}>
      <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/>
   </svg>
);

const CrossIcon = ({ size=24 }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={"0 0 24 24"}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
   </svg>
);

const ErrorOutlineIcon = ({ size=24 }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
   </svg>
);

const ToolMove = ({ size=24 }) => (
   <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path d="M12.9,10.7l-7.2,0.7L0,17V0L12.9,10.7z M24,17l-3-2.4v1.8h-3.5v-3.5h1.8l-2.4-3l-2.4,3h1.8v3.5h-3.5v-1.8l-3,2.4l3,2.4v-1.8h3.5v3.5h-1.8l2.4,3l2.4-3h-1.8v-3.5H21v1.8L24,17z"/>
   </svg>
);

export {
   AccountBoxIcon,
   CrossIcon,
   ErrorOutlineIcon,
   ToolMove
};

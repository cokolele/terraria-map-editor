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

const ToolMoveIcon = ({ size=24 }) => (
   <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path d="M12.9,10.7l-7.2,0.7L0,17V0L12.9,10.7z M24,17l-3-2.4v1.8h-3.5v-3.5h1.8l-2.4-3l-2.4,3h1.8v3.5h-3.5v-1.8l-3,2.4l3,2.4v-1.8h3.5v3.5h-1.8l2.4,3l2.4-3h-1.8v-3.5H21v1.8L24,17z"/>
   </svg>
);

const ToolSelectIcon = ({ size=24 }) => (
   <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path d="M1.5,14.5H0v-5h1.5V14.5z M6.5,22v-1.5h-5V22H6.5z M14.5,22v-1.5h-5V22H14.5z M22.5,22v-1.5h-5V22H22.5zM6.5,3.5V2h-5v1.5H6.5z M14.5,3.5V2h-5v1.5H14.5z M22.5,3.5V2h-5v1.5H22.5z M1.5,2H0v4h1.5V2z M1.5,18H0v4h1.5V18z M24,9.5h-1.5v5H24V9.5z M24,2h-1.5v4H24V2z M24,18h-1.5v4H24V18z"/>
   </svg>
);


const ToolPencilIcon = ({ size=24 }) => (
   <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path strokeWidth="1.5" strokeMiterlimit="10" d="M8.3,19.7l-4-4L16,4c0.2-0.2,0.5-0.2,0.7,0L20,7.3c0.2,0.2,0.2,0.5,0,0.7L8.3,19.7z M7.6,20.1l-3.7-3.7l-2.3,6l0,0L7.6,20.1z M20.7,7.3l1.6-1.6c0.2-0.2,0.2-0.5,0-0.7L19,1.7c-0.2-0.2-0.5-0.2-0.7,0l-1.6,1.6c-0.2,0.2-0.2,0.5,0,0.7L20,7.3C20.2,7.5,20.5,7.5,20.7,7.3z"/>
   </svg>
);

const ToolBucketIcon = ({ size=24 }) => (
   <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path strokeWidth="1.5" strokeMiterlimit="10" d="M7.1,8.8c0,0-0.8-2.1-0.3-4.5c0.7-3.2,3.4-6.2,5.8-0.4c0.4,1.1,1.1,5.5,0.9,6.9 M14,10.3c-0.2-0.2-0.6-0.2-0.8,0s-0.2,0.6,0,0.8s0.6,0.2,0.8,0S14.2,10.5,14,10.3z M21,13.6c0,0-2.3,2.6-2.3,4.6s1,2.8,2.3,2.8c1.3,0,2.3-0.8,2.3-2.8S21,13.6,21,13.6z M20.3,11.7l-8.1-8.1L0.8,15.1l8.1,8.1L20.3,11.7z"/>
   </svg>
);

const FolderIcon = ({ size=24 }) => (
   <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
   </svg>
);

export {
   AccountBoxIcon,
   CrossIcon,
   ErrorOutlineIcon,
   ToolMoveIcon,
   ToolSelectIcon,
   ToolPencilIcon,
   ToolBucketIcon,
   FolderIcon
};

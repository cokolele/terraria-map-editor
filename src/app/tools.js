import { ToolMoveIcon, ToolSelectIcon, ToolPencilIcon, ToolBucketIcon } from "/components/icon.jsx";

export default {
   move: {
      title: "Move (hand) tool",
      icon: ToolMoveIcon
   },
   pencil: {
      title: "Pencil tool",
      icon: ToolPencilIcon,
      stroke: true
   },
   select: {
      title: "Rectangle select tool",
      icon: ToolSelectIcon,
   },
   bucket: {
      title: "Paint bucket tool",
      icon: ToolBucketIcon,
      stroke: true
   }
};
import React, { useReducer } from "react";

import MapCanvas from "/components/map-canvas.jsx";
import Menu from "/components/menu.jsx";

import "./Editor.css";

function Editor() {
	//const [state, dispatch] = useReducer(commentsReducer, { comments: [] });

   return (
   	<div className="editor">
   		<Menu/>
			<MapCanvas/>
   	</div>
   )
}

export default Editor;
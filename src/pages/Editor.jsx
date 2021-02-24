import Menu from "src/components/menu.jsx";
import Optionbar from "src/components/optionbar.jsx";
import Toolbar from "src/components/toolbar.jsx";
import Canvas from "src/components/canvas.jsx";
import Sidebar from "src/components/sidebar.jsx";
import Statusbar from "src/components/statusbar.jsx";
import Modal from "src/components/modal.jsx";
import Appbar from "src/components/appbar.jsx";

import "./editor.css";

function Editor() {
   return (
      <div className="editor">
         <Canvas/>
         <Menu/>
         <Optionbar/>
         <Toolbar/>
         <Sidebar/>
         <Statusbar/>
         <Modal/>
         <Appbar/>
      </div>
   )
}

export default Editor;

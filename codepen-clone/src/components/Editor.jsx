import React,{useState} from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled } from "react-codemirror2";
import '../App.css'
function Editor(props) {
    const {language,displayName,value,onChange} = props
    function handleChange(editor,data,value){
        onChange(value)
    }
    const [open,setOpen] = useState(true)
  return (
    <div className={`editor-container ${open ? "" :"collapsed"}`}>
        <div className="editor-title">
            {displayName}
            <button style={{color:'white',backgroundColor:"hsl(225, 6%, 25%)"}} onClick={()=>setOpen(!open)} >Open/Close</button>
        </div>
        <Controlled 
            onBeforeChange={handleChange}
            value={value}
            className="code-mirror-wrapper"
            options={{
                lineWrapping:true,
                lint:true,
                mode:language,
                lineNumbers:true,
                theme:'material'
            }}
        />
    </div>
  );
}

export default Editor;

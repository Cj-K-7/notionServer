import { useState, useEffect } from "react";
import "./Canvas.css";
import WebGL from "./WebGL";

interface ICanvas extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

const Canvas: React.FC<ICanvas> = (props) => {
  const [gl, setGl] = useState<WebGLRenderingContext>();

  // Rendering Cycle of WebGL
  useEffect(() => {
    WebGL.initialize().then((gl) => {
      setGl(gl);
      WebGL.start(gl);
    });
    return () => {
      //Finish WebGl
      gl?.finish();
    };
  }, []);

  return (
    <div>
      <canvas id="glCanvas" {...props}>
        Your browser doesn't appear to support the HTML5
        <code>&lt;canvas&gt;</code> element.
      </canvas>
    </div>
  );
};

export default Canvas;

import { useState, useEffect } from "react";
import "./Canvas.css";
import WebGL from "./WebGL";

interface ICanvas extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

const Canvas: React.FC<ICanvas> = (props) => {
  const [context, setContext] = useState<WebGLRenderingContext>();

  // Rendering Cycle of WebGL
  useEffect(() => {
    WebGL.initialize().then((glContext) => {
      setContext(glContext);
      WebGL.start(glContext);
    });
    return () => {
      //Finish WebGl
      if (context) WebGL.finish(context);
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

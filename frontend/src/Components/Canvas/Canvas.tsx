import { useEffect } from "react";
import "./Canvas.css";
import WebGL from "./WebGL";

interface ICanvas extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

const Canvas: React.FC<ICanvas> = (props) => {
  useEffect(() => {
    WebGL.init().then(({ canvas, gl }) => WebGL.start(canvas, gl));
  }, []);
  return (
    <div>
      <canvas id="glCanvas" {...props}>
        Your browser doesn't appear to support the HTML5{" "}
        <code>&lt;canvas&gt;</code> element.
      </canvas>
    </div>
  );
};

export default Canvas;

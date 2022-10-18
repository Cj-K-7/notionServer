import shader from "./shader";
import buffer from "./buffer";
import drawer from "./drawer";

export type WebGLContexts = {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
};
export type WebGLProgramInformation = {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: number;
    vertexColor: number;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation | null;
    modelViewMatrix: WebGLUniformLocation | null;
  };
};

/**
 * Initailize GL & find "#glCanvas" and get context of WebGL
 * @returns Promise : WebGLRenderingContext
 */
const init = () => {
  return new Promise<WebGLContexts>(async (resolve, reject) => {
    try {
      const canvas = document.getElementById("glCanvas") as HTMLCanvasElement;
      if (!canvas) throw new Error("No Canvas for WebGL");
      const gl = canvas.getContext("webgl");
      if (!gl)
        throw new Error(
          "Unable to initialize WebGL. Your browser may not support it."
        );
      return resolve({ canvas, gl });
    } catch (error) {
      if (error instanceof Error) reject(error);
    }
  });
};

/**
 * Set basic config of Canvas for GL & Start WebGL Context
 * @param canvas
 * @param gl
 */
const start = async (canvas: HTMLCanvasElement, gl: WebGLRenderingContext) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const shaderProgram = await shader.initShaderProgram(gl);
      const buffers = await buffer.initBuffers(gl);
      const programInfo: WebGLProgramInformation = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(
            shaderProgram,
            "aVertexPosition"
          ),
          vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(
            shaderProgram,
            "uProjectionMatrix"
          ),
          modelViewMatrix: gl.getUniformLocation(
            shaderProgram,
            "uModelViewMatrix"
          ),
        },
      };
      drawer.drawScene(gl, programInfo, buffers);
    } catch (error) {
      if (error instanceof Error) reject(error);
    }
  });
};

const WebGL = { init, start };

export default WebGL;

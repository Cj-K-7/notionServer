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
  return new Promise<WebGLRenderingContext>(async (resolve, reject) => {
    try {
      const canvas = document.getElementById("glCanvas") as HTMLCanvasElement;
      if (!canvas) throw new Error("No Canvas for WebGL");
      const gl = canvas.getContext("webgl");
      if (!gl)
        throw new Error(
          "Unable to initialize WebGL. Your browser may not support it."
        );
      return resolve(gl);
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
const start = async (gl: WebGLRenderingContext) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      //Init Shader
      const shaderProgram = await shader.initShaderProgram(gl);
      //Declare Program
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
      //Init Buffer
      const buffers = await buffer.initBuffers(gl);

      let then = 0;
      //Draw scene repeatedly
      const render = (now: number) => {
        now *= 0.001;
        const deltaTime = now - then;
        then = now;
        //Drawing Scene
        drawer.drawScene(gl, programInfo, buffers, deltaTime);
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
      resolve();
    } catch (error) {
      if (error instanceof Error) reject(error);
    }
  });
};

const WebGL = { init, start };

export default WebGL;

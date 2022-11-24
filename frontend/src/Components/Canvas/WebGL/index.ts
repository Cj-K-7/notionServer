import shader from "./shader";
import buffer from "./buffer";
import drawer from "./drawer";
import textureLoader from "./texture";

export type WebGLContexts = {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
};
export type WebGLProgramInformation = {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: number;
    textureCoord: number;
    vertexColor: number;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation | null;
    modelViewMatrix: WebGLUniformLocation | null;
    uSampler: WebGLUniformLocation | null;
  };
};

/**
 * Initialize WebGL on "#glCanvas" and get context of WebGL
 * @returns Promise : WebGLRenderingContext
 */
const initialize = () => {
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
 * Set basic config of WebGL Context
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
          textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
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
          uSampler: gl.getUniformLocation(shaderProgram, "uSampler"),
        },
      };
      //Init Buffer
      const buffers = await buffer.initBuffers(gl);
      // Load texture
      const texture = await textureLoader(gl, "cubetexture.png");
      // Flip image pixels into the bottom-to-top order that WebGL expects.
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.activeTexture(gl.TEXTURE0);

      // Bind the texture to texture unit 0
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Tell the shader we bound the texture to texture unit 0
      gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
      let then = 0;
      //Draw scene repeatedly
      const render = (now: number) => {
        now *= 0.001;
        const deltaTime = now - then;
        then = now;
        //Drawing Scene
        drawer.drawScene(gl, programInfo, buffers, texture, deltaTime);
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
      resolve();
    } catch (error) {
      if (error instanceof Error) reject(error);
    }
  });
};

const WebGL = { initialize, start };

export default WebGL;

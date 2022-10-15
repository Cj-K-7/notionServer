import { mat4 } from "gl-matrix";

type WebGLContexts = { canvas: HTMLCanvasElement; gl: WebGLRenderingContext };

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

const loadShader = (
  gl: WebGLRenderingContext,
  shader_type: "fragment" | "vertex"
) => {
  return new Promise<WebGLShader>(async (resolve, reject) => {
    try {
      switch (shader_type) {
        case "fragment": {
          const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
          const fsSource = `
            void main() {
              gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            }
          `;
          if (!!fragmentShader) {
            gl.shaderSource(fragmentShader, fsSource);
            gl.compileShader(fragmentShader);
            if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
              throw new Error(
                "An error occurred compiling the Fragment shaders: " +
                  gl.getShaderInfoLog(fragmentShader)
              );
            return resolve(fragmentShader);
          }
          break;
        }
        case "vertex":
          const vertextShader = gl.createShader(gl.VERTEX_SHADER);
          const vsSource = `
          attribute vec4 aVertexPosition;
      
          uniform mat4 uModelViewMatrix;
          uniform mat4 uProjectionMatrix;
      
          void main() {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
          }
        `;
          if (!!vertextShader) {
            gl.shaderSource(vertextShader, vsSource);
            gl.compileShader(vertextShader);
            if (!gl.getShaderParameter(vertextShader, gl.COMPILE_STATUS))
              throw new Error(
                "An error occurred compiling the Vertext shaders: " +
                  gl.getShaderInfoLog(vertextShader)
              );
            return resolve(vertextShader);
          }
          break;
        default:
          throw new Error("Can't Find ShaderScript type");
      }
    } catch (error) {
      if (error instanceof Error) reject(error);
    }
  });
};

const initShaderProgram = (gl: WebGLRenderingContext) => {
  return new Promise<WebGLProgram>(async (resolve, reject) => {
    try {
      const fragmentShader = await loadShader(gl, "fragment");
      const vertexShader = await loadShader(gl, "vertex");

      // Create the shader program
      const shaderProgram = gl.createProgram();
      if (!shaderProgram) throw new Error("Can't create shader-program");
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      // If creating the shader program failed, alert
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
        throw new Error(
          `Unable to initialize the shader program. ${gl.getProgramInfoLog(
            shaderProgram
          )}`
        );
      return resolve(shaderProgram);
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
  return new Promise(async (resolve, reject) => {
    try {
      gl.clearColor(0.0, 0.0, 0.0, 1.0); // Set clear color to black, fully opaque
      gl.enable(gl.DEPTH_TEST); // Enable depth testing
      gl.depthFunc(gl.LEQUAL); // Near things obscure far things
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color as well as the depth buffer.
      gl.viewport(0, 0, canvas.width, canvas.height); // set Veiwport

      const shaderProgram = await initShaderProgram(gl);

      const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(
            shaderProgram,
            "aVertexPosition"
          ),
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
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      const positions = [1.0, 2.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
      );
      // Create a perspective matrix, a special matrix that is
      // used to simulate the distortion of perspective in a camera.
      // Our field of view is 45 degrees, with a width/height
      // ratio that matches the display size of the canvas
      // and we only want to see objects between 0.1 units
      // and 100 units away from the camera.

      const fieldOfView = (45 * Math.PI) / 180; // in radians
      const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      const zNear = 0.1;
      const zFar = 100.0;
      const projectionMatrix = mat4.create();

      // note: glmatrix.js always has the first argument
      // as the destination to receive the result.
      mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

      // Set the drawing position to the "identity" point, which is
      // the center of the scene.
      const modelViewMatrix = mat4.create();

      // Now move the drawing position a bit to where we want to
      // start drawing the square.

      mat4.translate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to translate
        [-0.0, 0.0, -6.0]
      ); // amount to translate

      // Tell WebGL how to pull out the positions from the position
      // buffer into the vertexPosition attribute.
      {
        const numComponents = 2; // pull out 2 values per iteration
        const type = gl.FLOAT; // the data in the buffer is 32bit floats
        const normalize = false; // don't normalize
        const stride = 0; // how many bytes to get from one set of values to the next
        // 0 = use type and numComponents above
        const offset = 0; // how many bytes inside the buffer to start from
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
      }

      // Tell WebGL to use our program when drawing

      gl.useProgram(programInfo.program);

      // Set the shader uniforms

      gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
      );
      gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
      );

      {
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
      }
    } catch (error) {
      if (error instanceof Error) reject(error);
    }
  });
};

const WebGL = { init, start };

export default WebGL;

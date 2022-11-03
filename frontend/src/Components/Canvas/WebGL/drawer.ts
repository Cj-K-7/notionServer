import { mat4 } from "gl-matrix";
import { WebGLProgramInformation } from ".";
import { Buffers } from "./buffer";

let cubeRotation = 0.0;

const drawScene = (
  gl: WebGLRenderingContext,
  programInfo: WebGLProgramInformation,
  buffers: Buffers,
  deltaTime?: number
) => {
  return new Promise<void>((resolve, reject) => {
    try {
      gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
      gl.clearDepth(1.0); // Clear everything
      gl.enable(gl.DEPTH_TEST); // Enable depth testing
      gl.depthFunc(gl.LEQUAL); // Near things obscure far things
      // Clear the canvas before we start drawing on it.
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      //Camera View Config
      const fieldOfView = (60 * Math.PI) / 180; // in radians
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

      mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        cubeRotation, // amount to rotate in radians
        [0, 1, 0]
      ); // axis to rotate around
      mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        cubeRotation * 0.7, // amount to rotate in radians
        [1, 0, 0]
      ); // axis to rotate around
      mat4.rotate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to rotate
        cubeRotation * 0.3, // amount to rotate in radians
        [0, 0, 1]
      ); // axis to rotate around

      // Tell WebGL how to pull out the positions from the position
      // buffer into the vertexPosition attribute.
      {
        /** 3D에서 필요한 X Y Z 좌표 Depth- Coordinate system */
        const numComponents = 3;
        /** the data in the buffer is 32bit floats */
        const type = gl.FLOAT;
        const normalize = false; // don't normalize
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
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
      // Tell WebGL how to pull out the colors from the color buffer
      // into the vertexColor attribute.
      {
        /** 필요한 Color data depth - RGBA */
        const numComponents = 4;
        /** the data in the buffer is 32bit floats */
        const type = gl.FLOAT;
        const normalize = false; // don't normalize
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
        gl.vertexAttribPointer(
          programInfo.attribLocations.vertexColor,
          numComponents,
          type,
          normalize,
          stride,
          offset
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
      }

      {
        /** 1쌍의 삼각형으로 이루어진 1면을 Cube의 vertex array에 각 삼각형 점을 적용(indexing)하기 해주는데,
         * 삼각형의 12면으로 이루어진 큐브가 되어 12 X 3 , 총 36개의 점이 생성된다.
         */
        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
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
      if (!deltaTime) throw new Error("Delta Time is undefined");
      cubeRotation += deltaTime;
    } catch (error) {
      if (error instanceof Error) reject(error);
    }
  });
};

const drawer = { drawScene };

export default drawer;

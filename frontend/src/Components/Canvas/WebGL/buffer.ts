export type Buffers = {
  position: WebGLBuffer;
  color: WebGLBuffer;
};
/**
 * Init target Buffers
 * @param gl
 * @returns
 */
const initBuffers = (gl: WebGLRenderingContext) => {
  return new Promise<Buffers>((resolve, reject) => {
    try {
      //Position Buffer
      const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
      const positionBuffer = gl.createBuffer();
      if (!positionBuffer) throw new Error("Can't create Position-Buffer");
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
      );

      //Color Buffer
      const colors = [
        1.0,
        1.0,
        1.0,
        1.0, // white
        1.0,
        0.0,
        0.0,
        1.0, // red
        0.0,
        1.0,
        0.0,
        1.0, // green
        0.0,
        0.0,
        1.0,
        1.0, // blue
      ];
      const colorBuffer = gl.createBuffer();
      if (!colorBuffer) throw new Error("Can't create Color-Buffer");
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

      return resolve({ position: positionBuffer, color: colorBuffer });
    } catch (error) {
      if (error instanceof Error) reject(error);
    }
  });
};

export default { initBuffers };

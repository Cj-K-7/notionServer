/*Buffer

webgl shader에 32비트 부동소수(float) 데이터를 전달해야하기 떄문에 필요.

위치 / 법선 / 텍스처 좌표 /정점 색상 등을 포함.
2진 데이터 버퍼를 의미.
*/

export type Buffers = {
  position: WebGLBuffer;
  color: WebGLBuffer;
  indices: WebGLBuffer;
};
/**
 * Init target Buffers : rendering data
 * @param gl
 * @returns
 */
const initBuffers = (gl: WebGLRenderingContext) => {
  return new Promise<Buffers>((resolve, reject) => {
    try {
      /** Position Buffer : 총 6개의 면에 대한 Coordinate System 기준으로 vertice 1개의 X , Y , Z 축 위치를 선언한다. */
      const positions = [
        // Front face
        //x , y , z 총 3개의 요소로 12개의 Float이 1개의 face(면) 위치 데이터를 제공
        -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

        // Back face
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

        // Top face
        -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

        // Right face
        1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

        // Left face
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
      ];
      const positionBuffer = gl.createBuffer();
      if (!positionBuffer) throw new Error("Can't create Position-Buffer");
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      //여기서 32bit 부동소수(float)는 32bit로 이진 데이터(0 / 1)로 이루어진 숫자 배열
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
      );

      /**Color Buffer : 총 6면에 대한 RGBA float 값 배열로 이루어진 data*/
      const faceColors = [
        [1.0, 1.0, 1.0, 1.0], // Front face: white
        [1.0, 0.0, 0.0, 1.0], // Back face: red
        [0.0, 1.0, 0.0, 1.0], // Top face: green
        [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
        [1.0, 1.0, 0.0, 1.0], // Right face: yellow
        [1.0, 0.0, 1.0, 1.0], // Left face: purple
      ];
      let colors: number[] = [];
      for (let i = 0; i < faceColors.length; ++i) {
        const c = faceColors[i];
        colors = colors.concat(c, c, c, c);
      }
      const colorBuffer = gl.createBuffer();
      if (!colorBuffer) throw new Error("Can't create Color-Buffer");
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

      /**Index Buffer : 6면체에 필요한 점은 총 24개이지만 8개의 점(vertex)로 충분히 육면체를 만들수 있기 떄문에,
       *같은 점의 순서를 정해줘서 vertex 위치를 정렬된 Array Buffer 로 전달해주는 Data
       **/
      const indices = [
        0,
        1,
        2,
        0,
        2,
        3, // front
        4,
        5,
        6,
        4,
        6,
        7, // back
        8,
        9,
        10,
        8,
        10,
        11, // top
        12,
        13,
        14,
        12,
        14,
        15, // bottom
        16,
        17,
        18,
        16,
        18,
        19, // right
        20,
        21,
        22,
        20,
        22,
        23, // left
      ];
      const indexBuffer = gl.createBuffer();
      if (!indexBuffer) throw new Error("Can't create Index-Buffer");
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW
      );
      return resolve({
        position: positionBuffer,
        color: colorBuffer,
        indices: indexBuffer,
      });
    } catch (error) {
      if (error instanceof Error) reject(error);
    }
  });
};

const buffers = { initBuffers };

export default buffers;

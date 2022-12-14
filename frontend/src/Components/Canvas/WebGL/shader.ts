type Shader = "vertex" | "fragment";
const vertex: Shader = "vertex" as const;
const fragment: Shader = "fragment" as const;

const fsSource = `
varying highp vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void) {
  gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`;

const vsSource = `
attribute vec4 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying highp vec2 vTextureCoord;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vTextureCoord = aTextureCoord;
}
`;

/**
 * Load  {type}-shader
 * @param gl
 * @param shader_type
 * @returns fragmentShader | vertexShader
 */
const loadShader = (gl: WebGLRenderingContext, shader_type: Shader) => {
  return new Promise<WebGLShader>(async (resolve, reject) => {
    try {
      switch (shader_type) {
        case "fragment": {
          const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
          if (!!fragmentShader) {
            gl.shaderSource(fragmentShader, fsSource);
            gl.compileShader(fragmentShader);
            if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
              gl.deleteShader(fragmentShader);
              throw new Error(
                "An error occurred during compiling the Fragment shaders: " +
                  gl.getShaderInfoLog(fragmentShader)
              );
            }
            return resolve(fragmentShader);
          }
          break;
        }
        case "vertex":
          const vertextShader = gl.createShader(gl.VERTEX_SHADER);
          if (!!vertextShader) {
            gl.shaderSource(vertextShader, vsSource);
            gl.compileShader(vertextShader);
            if (!gl.getShaderParameter(vertextShader, gl.COMPILE_STATUS)) {
              gl.deleteShader(vertextShader);
              throw new Error(
                "An error occurred during compiling the Vertext shaders: " +
                  gl.getShaderInfoLog(vertextShader)
              );
            }
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

/**
 * Initiate  Shader Programs(Frag / Vertx). it means attach shader'program to canvas
 * @param gl
 * @returns WebGLProgram
 */
const initShaderProgram = (gl: WebGLRenderingContext) => {
  return new Promise<WebGLProgram>(async (resolve, reject) => {
    try {
      const fragmentShader = await loadShader(gl, fragment);
      const vertexShader = await loadShader(gl, vertex);

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

const shader = { initShaderProgram };

export default shader;

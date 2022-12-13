import UAParser from "ua-parser-js";
import {
  GL_ARRAY_BUFFER,
  GL_COLOR_BUFFER_BIT,
  GL_FLOAT,
  GL_FRAGMENT_SHADER,
  GL_RGBA,
  GL_STATIC_DRAW,
  GL_TRIANGLES,
  GL_UNSIGNED_BYTE,
  GL_VERTEX_SHADER,
} from "webgl-constants";

const os = UAParser(navigator.userAgent).os;

function calculateMagicPixelId() {
  const attributes = {
    alpha: false,
    antialias: false,
    depth: false,
    failIfMajorPerformanceCaveat: false,
    powerPreference: "high-performance",
    stencil: false,
  };

  // Workaround for Safari 12, which otherwise crashes with powerPreference set
  // to high-performance: https://github.com/pmndrs/detect-gpu/issues/5
  if (/Version\/12.+Safari/.test(navigator.userAgent)) {
    delete attributes.powerPreference;
  }

  const canvas = window.document.createElement("canvas");

  const gl =
    canvas.getContext("webgl", attributes) ||
    canvas.getContext("experimental-webgl", attributes);

  const vertexShaderSource = /* glsl */ `
      precision highp float;
      attribute vec3 aPosition;
      varying float vvv;
      void main() {
        vvv = 0.31622776601683794;
        gl_Position = vec4(aPosition, 1.0);
      }
    `;

  const fragmentShaderSource = /* glsl */ `
      precision highp float;
      varying float vvv;
      void main() {
        vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * vvv;
        enc = fract(enc);
        enc -= enc.yzww * vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);
        gl_FragColor = enc;
      }
    `;

  const vertexShader = gl.createShader(GL_VERTEX_SHADER);
  const fragmentShader = gl.createShader(GL_FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!(fragmentShader && vertexShader && program)) return;
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  gl.useProgram(program);

  const vertexArray = gl.createBuffer();
  gl.bindBuffer(GL_ARRAY_BUFFER, vertexArray);
  gl.bufferData(
    GL_ARRAY_BUFFER,
    new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
    GL_STATIC_DRAW
  );

  const aPosition = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(aPosition, 3, GL_FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.clearColor(1, 1, 1, 1);
  gl.clear(GL_COLOR_BUFFER_BIT);
  gl.viewport(0, 0, 1, 1);
  gl.drawArrays(GL_TRIANGLES, 0, 3);

  const pixels = new Uint8Array(4);
  gl.readPixels(0, 0, 1, 1, GL_RGBA, GL_UNSIGNED_BYTE, pixels);

  gl.deleteProgram(program);
  gl.deleteBuffer(vertexArray);
  const joinedPixels = pixels.join("");
  return joinedPixels;
}

let canRunAr = false;
const version = parseFloat(os.version);

if (os.name.toLowerCase() === "ios") {
  const magicPixel = calculateMagicPixelId();
  canRunAr =
    version >= 15 ||
    (version >= 13 &&
      (magicPixel === "801621810" || magicPixel === "80162181255"));
} else if (os.name.toLowerCase() === "android") {
  canRunAr = version >= 10;
}

export default function () {
  /* eslint-disable */
      var check = false;
      (function (a) {
          if (
              /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                  a
              ) ||
              /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                  a.substr(0, 4)
              )
          )
              check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check && canRunAr;
  }
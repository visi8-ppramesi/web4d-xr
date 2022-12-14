// https://github.com/lodash/lodash/blob/master/isObject.js
export function isObject(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}

// https://github.com/lodash/lodash/blob/master/.internal/getTag.js
export function getTag(value) {
  if (value === null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}

// https://github.com/lodash/lodash/blob/master/isFunction.js
export function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }

  const tag = getTag(value);
  return (
    tag === "[object Function]" ||
    tag === "[object AsyncFunction]" ||
    tag === "[object GeneratorFunction]" ||
    tag === "[object Proxy]"
  );
}

// https://github.com/lodash/lodash/blob/master/isString.js
export function isString(value) {
  const type = typeof value;
  return (
    type === "string" ||
    (type === "object" &&
      value != null &&
      !Array.isArray(value) &&
      getTag(value) === "[object String]")
  );
}

export function mapObject(value, fn) {
  if (!isObject(value)) {
    return [];
  }
  return Object.keys(value).map((key) => fn(value[key], key));
}

export function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

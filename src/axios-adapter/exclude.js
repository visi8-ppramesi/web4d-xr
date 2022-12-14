// import { isObject } from "./utilities";

function exclude(config = {}, req) {
  const { exclude = {}, debug } = config;
  const method = req.method.toLowerCase();

  if (method === "head" || exclude.methods.includes(method)) {
    console.log(`Excluding request by HTTP method ${req.url}`);
    debug(`Excluding request by HTTP method ${req.url}`);

    return true;
  }

  if (typeof exclude.filter === "function" && exclude.filter(req)) {
    console.log(`Excluding request by filter ${req.url}`);
    debug(`Excluding request by filter ${req.url}`);

    return true;
  }

  // do not cache request with query
  // const hasQueryParams =
  //   /\?.*$/.test(req.url) ||
  //   (isObject(req.params) && Object.keys(req.params).length !== 0) ||
  //   (typeof URLSearchParams !== "undefined" &&
  //     req.params instanceof URLSearchParams);

  // if (exclude.query) {
  //   console.log(`Excluding request by query ${req.url}`);
  //   debug(`Excluding request by query ${req.url}`);

  //   return true;
  // }

  const paths = exclude.paths || [];
  const found = paths.some((regexp) => req.url.match(regexp));

  if (found) {
    console.log(`Excluding request by url match ${req.url}`);
    debug(`Excluding request by url match ${req.url}`);

    return true;
  }

  return false;
}

export default exclude;

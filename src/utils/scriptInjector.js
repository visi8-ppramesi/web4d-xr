export default function (id, url, afterLoad = () => {}) {
  const script = document.createElement("script");
  script.setAttribute("src", url);
  script.setAttribute("id", id);
  document.head.appendChild(script);
  //eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    script.addEventListener("load", () => {
      Promise.resolve(afterLoad)
        .then((v) => v())
        .then((k) => {
          resolve(k);
        });
    });
  });
}

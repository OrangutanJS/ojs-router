export default function setOnPopStateEvent(callback) {
  if (!window.onpopstate) {
    window.onpopstate = function (e) {
      e.preventDefault();
      callback();
    }
  }
}

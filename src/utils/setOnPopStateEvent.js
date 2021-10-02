import oRouter from "../oRouter";

export default function setOnPopStateEvent() {
  if (!window.onpopstate) {
    window.onpopstate = function (e) {
      e.preventDefault();
      oRouter.route();
    }
  }
}

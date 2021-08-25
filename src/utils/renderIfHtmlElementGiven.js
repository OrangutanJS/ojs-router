export default function renderIfHtmlElementGiven(element, renderIn = document.body) {
  if (element instanceof HTMLElement) {
    renderIn.innerHTML = '';
    renderIn.appendChild(element);
  }
}

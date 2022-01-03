export default function renderIfHtmlElementGiven(element, renderIn = document.body) {
  if (!element) {
    return;
  }

  const render = (element) => {
    renderIn.innerHTML = '';
    renderIn.appendChild(element);
  }

  if (element instanceof HTMLElement) {
    render(element);
  }

  if (element.init && typeof element.init === 'function') {
    const result = element.init();
    if (result instanceof HTMLElement) {
      render(result);
    }
  }
}

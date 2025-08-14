export function uid(prefix = '') {
  return (
    prefix +
    Math.random().toString(36).substring(2, 9) +
    Date.now().toString(36)
  );
}

export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

export function on(element, event, selectorOrHandler, handler) {
  if (typeof selectorOrHandler === 'function') {
    element.addEventListener(event, selectorOrHandler);
  } else {
    element.addEventListener(event, (e) => {
      if (e.target.matches(selectorOrHandler)) handler(e);
    });
  }
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

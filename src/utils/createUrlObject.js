export default function createUrlObject(path, originPrefix = '') {
  if (typeof path === 'object' && path instanceof URL) return path;

  return path ?
    new URL(window.location.origin + originPrefix + path) :
    new URL(window.location.href);
}

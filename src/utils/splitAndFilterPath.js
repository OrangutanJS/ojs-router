export default function splitAndFilterPath(path) {
  return path.split('/').filter(part => part !== '');
}

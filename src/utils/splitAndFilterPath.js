export default function splitAndFilterPath(path, originPrefix = '') {
  const parsedOriginPrefix = originPrefix.startsWith('/') ? originPrefix.substring(1) : originPrefix;
  return path.split('/').filter(part => part !== '' && part !== parsedOriginPrefix);
}

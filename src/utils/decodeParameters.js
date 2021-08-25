const FORBIDDEN_PARAMETERS = [
  'fullPath',
  'url',
  'hash',
  'searchParameters'
]

export default function decodeParameters(route, splittedPath) {
  const decodedParameters = {}
  foundRoute.splitted.forEach((part, index) => {
    if (part.startsWith(':')) {
      const parameterName = part.replace(':', '');
      if(FORBIDDEN_PARAMETERS.includes(parameterName)) return;

      decodedParameters[parameterName] = splittedPath[index];
    }
  });
  return decodedParameters;
}

export default function decodeSearchQuery(query) {
  const parsedQuery = Object.create(null);
  if (
    typeof query !== 'string' ||
    !query.length ||
    !query.startsWith('?')
  )
    return parsedQuery;


  const queryParametersSplitted = query.substring(1).split('&');
  queryParametersSplitted.forEach(parameter => {
    const [key, value] = parameter.split('=');
    parsedQuery[decodeURIComponent(key)] = decodeURIComponent(value);
  });

  return parsedQuery;
}

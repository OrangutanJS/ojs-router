export default function encodeSearchQuery(searchParameters) {
  if (!searchParameters || typeof searchParameters !== 'object') return '';

  const searchParametersEntries = Object.entries(searchParameters);
  let searchQueryString = '?';

  searchQueryString += searchParametersEntries
    .filter(parameterEntry => searchParametersFilter(parameterEntry))
    .map(parameterEntry => searchParametersMapper(parameterEntry))
    .join('&');


  if (!searchQueryString.substring(1).length)
    return '';

  return searchQueryString;
}

function searchParametersFilter([, value]) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  );
}

function searchParametersMapper([key, value]) {
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}

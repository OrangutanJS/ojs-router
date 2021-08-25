export default function searchParametersToString(searchParameters) {
  const searchParametersEntries = Object.entries(searchParameters);

  return searchParametersEntries
    .map(parameterEntry => searchParametersMapper(parameterEntry))
    .join('&');
}

function searchParametersMapper([key, value]) {
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}

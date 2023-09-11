function parseCamelCaseString(camelCaseString) {
  let parsedString = camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2');
  parsedString =
    parsedString.charAt(0).toUpperCase() + parsedString.toLowerCase().slice(1);
  return parsedString;
}

export default parseCamelCaseString;

export default function parseDates(obj) {
  for (var key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // If the property is an object, recursively parse it
      obj[key] = parseDates(obj[key]);
    } else if (
      typeof obj[key] === 'string' &&
      obj[key].match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    ) {
      // If the property is a string in ISO date format, convert it to a Date object
      obj[key] = new Date(obj[key]);
    }
  }
  return obj;
}

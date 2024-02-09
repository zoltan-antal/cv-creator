function isFieldEmpty([key, value]) {
  if (key === 'id') {
    return true;
  }
  if (value === '') {
    return true;
  }
  if (typeof value === 'boolean' && !value) {
    return true;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return true;
    }
    if (value.length === 1 && value[0] === '') {
      return true;
    }
  }
  if (typeof value === 'object' && value instanceof Date) {
    if (Date.parse(value) === 0) {
      return true;
    }
  }

  return false;
}

export default isFieldEmpty;

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, _req, res, _next) => {
  console.log(error.message);

  switch (error.name) {
    case 'CastError':
      return res.status(400).send({ error: 'malformatted id' });
    case 'ValidationError':
      return res.status(400).json({ error: error.message });
    default:
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      return res.status(statusCode).json({ error: message });
  }
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};

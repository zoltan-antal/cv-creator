const BACKEND_URL = (() => {
  switch (import.meta.env.MODE) {
    case 'development':
      return import.meta.env.VITE_BACKEND_URL;

    case 'production': {
      const url = window.location.origin;
      const [protocol, rest] = url.split('//');
      return `${protocol}//api.${rest}`;
    }
  }
})();

export default {
  BACKEND_URL,
};

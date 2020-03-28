export default (src) => {
  return new Promise(((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', () => {
      resolve();
    });
    script.addEventListener('error', (e) => {
      reject(e);
    });
    document.head.appendChild(script);
  }));
};
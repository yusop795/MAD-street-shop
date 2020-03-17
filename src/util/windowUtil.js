const windowUtil = {
  isClient: typeof window === 'object',
  useWindowSize: function() {
    if (!this.isClient) return undefined;
    const { innerWidth, innerHeight } = window;
    return { width: innerWidth, height: innerHeight };
  },
};

export default windowUtil;

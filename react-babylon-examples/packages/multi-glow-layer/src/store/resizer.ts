let data = { width: 0, height: 0 };

export const resizer = {
  subscribe(onResize: () => void) {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  },
  getSnapshot() {
    const { innerHeight, innerWidth } = window;
    const { height, width } = data;

    if (height !== innerHeight || width !== innerWidth) {
      data = { height: innerHeight, width: innerWidth };
    }

    return data;
  },
};

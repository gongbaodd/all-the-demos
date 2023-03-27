/**
 * @param {(path: string, config: any) => Promise<any>} getAPI
 * @returns {(path: string, config: any) => Promise<any> & {clearCache: () => void}}
 */
function createGetAPIWithMerging(getAPI) {
  // your code here
  const cache = new Map();
  createGetAPIWithMerging.cache = cache;

  return async (...args) => {
    const [path, config] = args;
    const sortedConfig = Object.keys(config)
      .sort()
      .reduce((acc, key) => {
        acc[key] = config[key];
        return acc;
      }, {});
    const key = JSON.stringify([path, sortedConfig]);

    if (cache.has(key)) {
      return await cache.get(key);
    }

    const promise = getAPI(...args);
    cache.set(key, promise);

    // cache size is limited to 5
    if (cache.size > 5) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    setTimeout(() => {
      cache.delete(key);
    }, 1000);

    return await promise;
  };
}

createGetAPIWithMerging.clearCache = () => {
  createGetAPIWithMerging.cache.clear();
};

async function getAPI(...args) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(args);
      resolve(1);
    }, 100);
  });
}

const getAPIWithMerging = createGetAPIWithMerging(getAPI);
Promise.all([
  getAPIWithMerging("/list", { type: "bfe" }),
  getAPIWithMerging("/list", { type: "bfe" }),
]).then(
  (data) => {
    console.log(data);
  },
  (error) => {
    console.log(error);
  }
);

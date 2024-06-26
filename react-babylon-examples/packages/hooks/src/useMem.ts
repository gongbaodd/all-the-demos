import { useCallback, useMemo } from 'react';

interface IHashable {
  getHashCode(): number;
}

export function useMem() {
  const dataMem = useMemo(() => new Map<number, any>(), []);
  const arrayMem = useMemo(() => new Map<string, any[]>(), []);

  const memCallback = useCallback((datas: IHashable | IHashable[]) => {
    const isArray = Array.isArray(datas);
    datas = [datas].flat();
    const isItemCached = datas.every((data) => {
      const hash = data.getHashCode();
      const cached = dataMem.has(hash);
      return cached;
    });

    const key = datas.map((data) => data.getHashCode()).join('-');
    const isArrCached = arrayMem.has(key);

    if (!isItemCached) {
      datas.forEach((data) => {
        const hash = data.getHashCode();
        dataMem.set(hash, data);
      });
    }

    if (isArray && !isArrCached) {
      arrayMem.set(key, datas);
    }

    if (isArray) {
      return arrayMem.get(key)! satisfies IHashable[];
    }

    return dataMem.get(datas[0].getHashCode()) satisfies IHashable;
  }, []);

  return memCallback;
}

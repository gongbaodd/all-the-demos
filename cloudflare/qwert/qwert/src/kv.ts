import { IChapterRecord, IWordRecord } from './types';

type Options = { key: 'chapter'; value: IChapterRecord } | { key: 'word'; value: IWordRecord };

export const qwertKV = (env: Env) => {
  const get = async (key: Pick<Options, 'key'>['key']) => {
    const text = await env.qwertKV.get(key);

    if (!text) {
      return [];
    }

    return JSON.parse(text);
  };

  const add = async (opts: Options) => {
    const list = await get(opts.key);

    await env.qwertKV.put(opts.key, JSON.stringify([...list, opts.value]));

    return opts.value;
  };

  return {
    charpters: () => get('chapter'),
    words: () => get('word'),
    addChapters: (value: IChapterRecord) => add({ key: 'chapter', value }) as Promise<IChapterRecord>,
    addWords: (value: IWordRecord) => add({ key: 'word', value }) as Promise<IWordRecord>,
  };
};

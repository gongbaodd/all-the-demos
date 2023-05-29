import { qwertKV as storage } from './kv';
import { it, expect } from 'vitest';

const describe = setupMiniflareIsolatedStorage();
const { qwertKV } = getMiniflareBindings();

const testWord = {
  word: 'cancel',
  timeStamp: 1684996751,
  dict: 'cet4',
  chapter: 0,
  timing: [183, 135, 304, 161, 249],
  wrongCount: 1,
  mistakes: {
    '3': ['e'],
  },
};

const testChapter = {
  dict: 'cet4',
  chapter: 0,
  timeStamp: 1684996813,
  time: 67,
  correctCount: 160,
  wrongCount: 4,
  wordCount: 20,
  correctWordIndexes: [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 18, 19],
  wordNumber: 20,
  wordRecordIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
};

describe('src/kv.ts', () => {
  const kv = storage({
    qwertKV,
  });

  it('should get [] when run charpters()', async () => {
    const chapters = await kv.charpters();
    expect(chapters).toEqual([]);
  });

  it('should get [] when run words()', async () => {
    const words = await kv.words();
    expect(words).toEqual([]);
  });

  it('should get one word when run addWords()', async () => {
    const data = testWord;

    const word = await kv.addWords(data);

    expect(word).toEqual(data);

    const words = await kv.words();
    expect(words).toEqual([testWord]);
  });

  it('should get one chapter when run addChapters()', async () => {
    const data = testChapter;

    const chapter = await kv.addChapters(data);
    expect(chapter).toEqual(data);

    const chapters = await kv.charpters();
    expect(chapters).toEqual([testChapter]);
  });
});

import { expect, it, beforeAll, describe, vi, beforeEach, afterEach } from 'vitest';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import worker from './worker';
import { parse } from 'graphql';

describe('worker', () => {
  beforeAll(async () => {
    vi.mock('./kv', () => ({
      qwertKV: vi.fn(() => {
        return {
          charpters: vi.fn(() => []),
          words: vi.fn(() => []),
          addWords: vi.fn((data) => data),
          addChapters: vi.fn((data) => data),
        };
      }),
    }));
  });

  it('should response words and chapters', async () => {
    const executor = buildHTTPExecutor({ fetch: worker.fetch });
    const result = await executor({
      document: parse(/* GraphQL */ `
        query {
          chapters {
            dict
          }
          words {
            word
          }
        }
      `),
    });

    expect(result).toMatchInlineSnapshot(`
      {
        "data": {
          "chapters": [],
          "words": [],
        },
      }
    `);
  });

  it('should response addWord and addChapters', async () => {
    const executor = buildHTTPExecutor({ fetch: worker.fetch });
    const result = await executor({
      document: parse(/* GraphQL */ `
        mutation {
          addWord(
            input: {
              word: "cancel"
              timeStamp: 1684996751
              dict: "cet4"
              chapter: 0
              timing: [183, 135, 304, 161, 249]
              wrongCount: 1
              mistakes: { index: 3, mistakes: ["e"] }
            }
          ) {
            word
          }
          addChapter(
            input: {
              dict: "cet4"
              chapter: 0
              timeStamp: 1684996813
              time: 67
              correctCount: 160
              wrongCount: 4
              wordCount: 20
              correctWordIndexes: [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 18, 19]
              wordNumber: 20
              wordRecordIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
            }
          ) {
            dict
          }
        }
      `),
    });

    expect(result).toMatchInlineSnapshot(`
      {
        "data": {
          "addChapter": {
            "dict": "cet4",
          },
          "addWord": {
            "word": "cancel",
          },
        },
      }
    `);
  });
});

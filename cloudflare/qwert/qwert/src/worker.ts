/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { createYoga, createSchema } from 'graphql-yoga';
import { IWordRecord, IChapterRecord } from './types';
import { qwertKV } from './kv';

const yoga = createYoga<Env & ExecutionContext>({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Chapter {
        dict: String!
        chapter: Int
        timeStamp: Int!
        time: Int!
        correctCount: Int!
        wrongCount: Int!
        wordCount: Int!
        correctWordIndexes: [Int!]!
        wordNumber: Int!
        wordRecordIds: [Int!]!
      }

      input ChapterInput {
        dict: String!
        chapter: Int
        timeStamp: Int!
        time: Int!
        correctCount: Int!
        wrongCount: Int!
        wordCount: Int!
        correctWordIndexes: [Int!]!
        wordNumber: Int!
        wordRecordIds: [Int!]!
      }

      type Word {
        word: String!
        timeStamp: Int!
        dict: String!
        chapter: Int
        timing: [Int!]!
        wrongCount: Int!
        mistakes: [LetterMistakes!]!
      }

      input WordInput {
        word: String!
        timeStamp: Int!
        dict: String!
        chapter: Int
        timing: [Int!]!
        wrongCount: Int!
        mistakes: [LetterMistakesInput!]!
      }

      type LetterMistakes {
        index: Int!
        mistakes: [String!]!
      }

      input LetterMistakesInput {
        index: Int!
        mistakes: [String!]!
      }

      type Query {
        chapters: [Chapter!]!
        words: [Word!]!
      }

      type Mutation {
        addWord(input: WordInput!): Word
        addChapter(input: ChapterInput!): Chapter
      }
    `,
    resolvers: {
      Query: {
        chapters: (_, __, ctx) => qwertKV(ctx).charpters(),
        words: (_, __, ctx) => qwertKV(ctx).words(),
      },
      Mutation: {
        addWord: (_, args: { input: IWordRecord }, ctx) => qwertKV(ctx).addWords(args.input),
        addChapter: (_, args: { input: IChapterRecord }, ctx) => qwertKV(ctx).addChapters(args.input),
      },
    },
  }),
  landingPage: false,
  graphqlEndpoint: '/graphql',
});

// Export a default object containing event handlers
export default {
  // The fetch handler is invoked when this worker receives a HTTP(S) request
  // and should return a Response (optionally wrapped in a Promise)
  fetch: yoga.fetch,
};

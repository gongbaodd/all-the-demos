// https://fettblog.eu/typescript-union-to-intersection/

type toFunction<T> = T extends any ? (x: T) => void : never; // to () => void | () => void | () => void

type UnionToIntersection<T> = toFunction<T> extends (x: infer Result) => void
  ? Result
  : never;
// your code here
// explain
type WrapNaked<T> = T extends any ? { o: T } : never;
type Foo = WrapNaked<1 | 2 | 3>; // { o: 1 } | { o: 2 } | { o: 3 }

type WrapNaked2<T> = { o: T } extends any ? { o: T } : never;
type Foo2 = WrapNaked2<1 | 2 | 3>; // { o: 1 | 2 | 3 }

type WrapNaked3<T> = T extends any ? (x: T) => any : never;
type Foo3 = WrapNaked3<1 | 2 | 3>; // (x: 1) => any | (x: 2) => any | (x: 3) => any

type Bar = Foo3 extends (x: infer R) => any ? R : never;

type a = (o: { a: string }) => void;
type b = (o: { b: string }) => void;
type c = (o: { c: string }) => void;
type d = a | b | c;
type e = d extends (o: infer R) => void ? R : never;

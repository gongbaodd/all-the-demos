type TupleToUnion<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First | TupleToUnion<Rest>
  : never;
// your code here

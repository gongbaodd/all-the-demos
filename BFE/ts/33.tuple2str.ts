type TupleToString<T extends string[], Result extends string = ""> = T extends [
  infer Top,
  ...infer Rest
]
  ? Top extends string
    ? Rest extends string[]
      ? TupleToString<Rest, `${Result}${Top}`>
      : Result
    : Result
  : Result;

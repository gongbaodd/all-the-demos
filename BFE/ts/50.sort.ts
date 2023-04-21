type Lt<
  A extends number,
  B extends number,
  Count extends any[] = []
> = A extends B
  ? false // A === B => false
  : Count["length"] extends A
  ? Count["length"] extends B
    ? false
    : true
  : Count["length"] extends B
  ? false
  : Lt<A, B, [...Count, any]>;

type Insert<
  T extends number,
  Arr extends number[],
  Result extends number[] = []
> = Arr extends [infer A, ...infer Rest]
  ? A extends number
    ? Lt<T, A> extends true // T < A ?
      ? [...Result, T, A, ...Rest] // T < A
      : Rest extends number[] // T >= A
      ? Insert<T, Rest, [...Result, A]>
      : [...Result, A, T] // A is the last element
    : [...Result, T]
  : [...Result, T];

type Sort<T extends number[], Result extends number[] = []> = T extends [
  infer A,
  ...infer Rest
]
  ? A extends number
    ? Rest extends number[]
      ? Sort<Rest, Insert<A, Result>>
      : Insert<A, Result>
    : Result
  : Result;

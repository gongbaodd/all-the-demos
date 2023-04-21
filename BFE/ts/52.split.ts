type Split<
  S extends string,
  D extends string,
  Result extends string[] = []
> = S extends `${infer First}${D}${infer Rest}`
  ? Rest extends `${string}${D}${string}`
    ? Split<Rest, D, [...Result, First]>
    : [...Result, First, Rest]
  : [...Result, S];

type A = Split<"BFE.dev", ".">; // ['BFE', 'dev']
type B = Split<"bfe.dev", "e">; // ['bf', '.d', 'v']
type C = Split<"bfe.bfe.bfe", "bfe">; // ['', '.', '.', '']

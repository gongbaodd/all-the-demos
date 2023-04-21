type Str2Chars<T> = T extends `${infer L}${infer Rest}`
  ? [L, ...Str2Chars<Rest>]
  : [];

type RepeatString<
  T extends string,
  C extends number,
  Result extends string = T
> = C extends 0
  ? ""
  : Str2Chars<Result>["length"] extends C
  ? Result
  : RepeatString<T, C, `${Result}${T}`>;

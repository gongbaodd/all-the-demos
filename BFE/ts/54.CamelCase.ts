type CamelCase<
  S extends string,
  Result extends string = ""
> = S extends `${infer Word}_${infer Rest}`
  ? Word extends `${infer F}${infer R}`
    ? CamelCase<Rest, `${Result}${Uppercase<F>}${R}`>
    : CamelCase<Rest, `${Result}${Word}`>
  : S extends `${infer F}${infer R}`
  ? `${Result}${Uppercase<F>}${R}`
  : Result;

// type T = CamelCase<"big_front_end">; // BigFrontEnd

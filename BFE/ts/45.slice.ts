type Slice<
  A extends any[],
  S extends number = 0,
  E extends number = A["length"],
  CountStart extends any[] = [],
  CountEnd extends any[] = [],
  Result extends any[] = []
> = A extends [infer Top, ...infer Rest] // A.pop()
  ? CountEnd["length"] extends E // CoutEnd === E?
    ? Result // return Result
    : CountStart["length"] extends S // CountStart === S?
    ? Slice<Rest, S, E, CountStart, [...CountEnd, any], [...Result, Top]> // CountEnd++;Result.push(Top)
    : Slice<Rest, S, E, [...CountStart, any], [...CountEnd, any], Result> // CountStart++; CountEnd++
  : Result;

// type TA = Slice<[1, 2, 3, 4], 0, 2>; // [1, 2]
// type TB = Slice<[1, 2, 3, 4], 2>; // [3, 4]
// type TC = Slice<[number, boolean, bigint], 2, 5>; // [bigint]
// type TD = Slice<[string, boolean], 0, 1>; // [string]
// type TE = Slice<[number, boolean, bigint], 5, 6>; // []

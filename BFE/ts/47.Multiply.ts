type ToArray<
  T extends number,
  Result extends any[] = []
> = Result["length"] extends T ? Result : ToArray<T, [...Result, any]>;

type Multiply<
  A extends number,
  B extends number,
  ToA extends any[] = ToArray<A>,
  ToB extends any[] = [],
  Result extends any[] = []
> = A extends 0
  ? 0
  : B extends 0
  ? 0 // A ===0 => 0; B === 0 => 0
  : ToB["length"] extends B
  ? Result["length"]
  : Multiply<A, B, ToA, [...ToB, any], [...Result, ...ToA]>;

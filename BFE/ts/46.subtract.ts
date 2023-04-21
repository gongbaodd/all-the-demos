type Subtract<
  A extends number,
  B extends number,
  toA extends any[] = [],
  toB extends any[] = [],
  Result extends any[] = []
> = A extends B
  ? 0 // A === B => 0
  : toA["length"] extends A // toA === A?
  ? Result["length"] extends 0
    ? never
    : Result["length"] // return Result.length
  : toB["length"] extends B // toA!==A then toB === B?
  ? Subtract<A, B, [...toA, any], toB, [...Result, any]> // toA++; Result++
  : Subtract<A, B, [...toA, any], [...toB, any], Result>; // toA++; toB++

type A = Subtract<1, 1>; // 0
type B = Subtract<10, 3>; // 7
type C = Subtract<3, 10>; // never

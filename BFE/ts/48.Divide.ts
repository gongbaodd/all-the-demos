type ToArr<
  T extends number,
  Result extends any[] = []
> = Result["length"] extends T ? Result : ToArr<T, [...Result, any]>;

type LessThan<
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
  : LessThan<A, B, [...Count, any]>;

type Flatten<T extends any[][]> = T extends [infer A, ...infer B]
  ? A extends any[]
    ? B extends any[][]
      ? [...A, ...Flatten<B>]
      : [...A]
    : []
  : [];

type Divide<
  A extends number,
  B extends number,
  ToB extends any[] = ToArr<B>,
  Acc extends any[][] = [ToB],
  Pre extends any[][] = []
> = B extends 0
  ? never // B === 0 => never
  : LessThan<Flatten<Acc>["length"], A> extends true
  ? Divide<A, B, ToB, [...Acc, ToB], Acc>
  : Flatten<Acc>["length"] extends A
  ? Acc["length"]
  : Pre["length"];

type A = Divide<1, 0>; // never
type B = Divide<4, 2>; // 2
type C = Divide<10, 3>; // 3

type LargerThan<
  A extends number,
  B extends number,
  Count extends any[] = []
> = Count["length"] extends A
  ? false // count to A not B, A < B
  : Count["length"] extends B
  ? true // count to B not A, A > B
  : LargerThan<A, B, [...Count, any]>;

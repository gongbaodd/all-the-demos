type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type FindIndex<T extends any[], E, Count extends any[] = []> = T extends [
  infer Top,
  ...infer Rest
]
  ? Equal<Top, E> extends true
    ? Count["length"] // find item
    : FindIndex<Rest, E, [...Count, any]> // to find in Rest
  : never;

// https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript/68963796#68963796

// type Result = FindIndex<[any, never, 1, "2", true], 1>;

// type A = Equal<any, 1>;

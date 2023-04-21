type DiffKeys<A extends Record<string, any>, B extends Record<string, any>> =
  | Exclude<keyof A, keyof B>
  | Exclude<keyof B, keyof A>;

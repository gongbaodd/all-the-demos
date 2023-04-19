type Flat<T extends any[]> = T extends [infer Top, ...infer Rest]
  ? Top extends any[]
    ? [...Flat<Top>, ...Flat<Rest>]
    : [Top, ...Flat<Rest>]
  : T;

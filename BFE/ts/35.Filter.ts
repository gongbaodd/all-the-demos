type Filter<T extends any[], A> = T extends [infer Top, ...infer Rest]
  ? [Top] extends [A]
    ? [Top, ...Filter<Rest, A>]
    : Filter<Rest, A>
  : [];

type Result1 = Filter<[1, "BFE", 2, true, "dev"], number>;

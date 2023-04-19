// your code here, please dont use Parameters<T> in your code
type MyParameters<T extends Function> = T extends (...args: infer Args) => any
  ? Args
  : never;

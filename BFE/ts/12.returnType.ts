// your code here, please don't use Return<T> in your code
type MyReturnType<T extends Function> = T extends (...args: any[]) => infer Ret
  ? Ret
  : never;

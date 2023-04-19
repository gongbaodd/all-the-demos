// your code here, please don't use OmitThisParameter<T> in your code
// type MyReturnType<T extends (...args: any[]) => any> = T extends (
//   ...args: any[]
// ) => infer Ret
//   ? Ret
//   : never;
type MyOmitThisParameter<T extends (this: any) => any> = (
  this: unknown
) => MyReturnType<T>;

// your code here, please don't use ThisParameterType<T> in your code
type MyThisParameterType<T extends (...args: any[]) => any> = T extends (
  this: infer This,
  ...args: any[]
) => any
  ? This
  : never;

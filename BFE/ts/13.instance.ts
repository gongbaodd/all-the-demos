// your code here, please don't use InstanceType<T> in your code
type MyInstanceType<T extends new (...args: any[]) => any> = T extends new (
  ...args: any[]
) => infer Ins
  ? Ins
  : never;

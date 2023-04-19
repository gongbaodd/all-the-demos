// your code here, please don't use Omit<T, K> in your code
type MyOmit<T, K extends string | number | symbol> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

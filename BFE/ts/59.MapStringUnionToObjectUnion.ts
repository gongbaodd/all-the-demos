type MapStringUnionToObjectUnion<U extends string> = U extends string
  ? { value: U }
  : never;

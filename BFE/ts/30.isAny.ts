type IsAny<T> = 0 extends 1 & T ? true : false;

// In short, any is intentionally unsound, and violates the normal rules of types. You can detect this violation because it lets you do something crazy like assign 0 to 1.

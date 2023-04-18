regExp.test("a"); // true and it sets lastIndex = 1, As long as test() returns true, lastIndex will not reset—even when testing a different string!
regExp.test("b"); // false as the lastIndex i.e. staring point is not 0, lastIndex resets
regExp.test("c"); // true as lastIndex is 0 and regex satisfies
regExp.test("1"); // false

import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import { kmp } from "./main.ts";

Deno.test(function addTest() {
  const str = "ababcabcacbababcac";
  const word = "abcac";

  assertEquals(kmp(str, word), [5, 13]);
});

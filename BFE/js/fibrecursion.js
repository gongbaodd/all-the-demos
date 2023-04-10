// please modify code below to make it work for large number like `fib(1000)`
// recursion should still be used

function fib(n, n1 = 0, n2 = 1) {
  if (n === 0) {
    return n1;
  }

  if (n === 1) {
    return n2;
  }

  return fib(n - 1, n2, n1 + n2);
}

// n === 0 => 0
// n === 1 => 0+1
// n === 2 => 0 + (0+1)
// n === 3 => (0+1) + [0 + (0+1)]
// n === 4 => [0 + (0+1)] + [(0+1) + [0 + (0+1)]]

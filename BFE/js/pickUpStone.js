/**
 * @param {number} n
 * @return {'A' | 'B' | null}
 */
function canWinStonePicking(
  n,
  memo = {
    0: null,
    1: "B",
    2: "A",
    3: "A",
    4: "B",
  }
) {
  if (memo[n] !== undefined) return memo[n];
  // your code here
  // A pick 1, B pick 1, (n==2) A wins
  // A pick 1, B pick 2, (n==1) B wins
  // A pick 2, B pick 1, (n==1) B wins
  // A pick 2, B pick 2, (n==0) A wins
  // n === 5, A wins
  // A pick 1, B pick 1, (n==3) A wins
  // A pick 1, B pick 2, (n==2) A wins
  // A pick 2, B pick 1, (n==2) A wins
  // A pick 2, B pick 2, (n==1) B wins
  // n === 6, A wins
  // A pick 1, B pick 1, (n==4) B wins
  // A pick 1, B pick 2, (n==3) A wins
  // A pick 2, B pick 1, (n==3) A wins
  // A pick 2, B pick 2, (n==2) A wins
  // n === 7, B wins
  // A pick 1, B pick 1, (n==5) A wins
  // A pick 1, B pick 2, (n==4) B wins
  // A pick 2, B pick 1, (n==4) B wins
  // A pick 2, B pick 2, (n==3) A wins

  // A pick 1, B pick 1
  const a1b1 = canWinStonePicking(n - 2, memo);
  memo[n - 2] = a1b1;
  // A pick 1, B pick 2
  const a1b2 = canWinStonePicking(n - 3, memo);
  memo[n - 3] = a1b2;

  if (a1b1 === a1b2) return "A";

  // A pick 2, B pick 1
  const a2b1 = canWinStonePicking(n - 3, memo);
  memo[n - 3] = a2b1;
  // A pick 2, B pick 2
  const a2b2 = canWinStonePicking(n - 4, memo);
  memo[n - 4] = a2b2;

  if (a2b1 === a2b2) return "A";

  return "B";
}

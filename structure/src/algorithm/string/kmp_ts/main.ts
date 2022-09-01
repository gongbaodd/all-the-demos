export function kmp(str: string, word: string): number[] {
  const next: number[] = [];

  [...word].forEach((_, inext) => {
    if (inext === 0) {
      return next.push(0);
    }

    let imatched = next[inext - 1];

    while (imatched > 0 && word[imatched] !== word[inext]) {
      imatched = next[imatched - 1];
    }

    next.push(word[imatched] === word[inext] ? imatched + 1 : imatched);
  });

  const res: number[] = [];
  let iword = 0;
  [...str].forEach((c, istr) => {
    while (c !== word[iword] && iword > 0) {
      iword = next[iword - 1];
    }

    if (c === word[iword]) {
      iword++;
    }

    if (iword === word.length) {
      res.push(istr - iword + 1);
      iword = next[iword - 1];
    }
  });

  return res;
}

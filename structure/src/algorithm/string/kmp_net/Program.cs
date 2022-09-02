
string str = "ababcabcacbababcac";
string word = "abcac";

Console.WriteLine(string.Join(" ", kmp(str, word)));

List<int> kmp(string str, string word) {
    int[] next = getNext(word);
    return kmp_with_next(str, word, next);
}

int[] getNext(string word) {
    int[] next = new int[word.Length];
    next[0] = 0;

    foreach (int inext in Enumerable.Range(1, word.Length-1)) {
        int imatched = next[inext - 1];
        while (imatched > 0 && word[imatched] != word[inext]) {
            imatched = next[imatched - 1];
        }
        next[inext] = word[imatched] == word[inext] ? imatched + 1: imatched;
    }

    return next;
}

List<int> kmp_with_next(string str, string word, int[] next) {
    List<int> res = new List<int>();

    int iword = 0;
    int istr = 0;
    foreach (char c in str) {
        while (c!= word[iword] && iword > 0) {
            iword = next[iword - 1];
        }

        if (c == word[iword]) {
            iword++;
        }

        if (iword == word.Length) {
            res.Add(istr - iword + 1);
            iword = next[iword - 1];
        }

        istr++;
    }

    return res;
}

// Console.WriteLine(string.Join(" ", next));
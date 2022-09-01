pub trait KMP {
    fn kmp(&self, word: String) -> Vec<usize>;
}

impl KMP for String {
    fn kmp(&self, word: String) -> Vec<usize> {
        let next = get_next(word.to_owned());
        search_by_next(self.to_string(), word, next)
    }
}

/*
    a
    0
    a b
    0 0
    ab c
    00 0
    abc a
    000 1
    abca c
    0001 0
*/
fn get_next(w: String) -> Vec<usize> {
    let word: Vec<char> = w.chars().collect();
    let mut next = vec![0];

    for inext in 1..word.len() {
        let mut imatched = next[inext - 1];

        while word[inext] != word[imatched] && imatched > 0 {
            imatched = next[imatched - 1];
        }

        next.push(if word[inext] == word[imatched] {
            imatched + 1
        } else {
            imatched
        })
    }

    next
}
/*
      i
    ababcabcacbababcac
    abcac
    00010
    j
*/
fn search_by_next(s: String, w: String, next: Vec<usize>) -> Vec<usize> {
    let mut res = vec![];

    let str: Vec<char> = s.chars().collect();
    let word: Vec<char> = w.chars().collect();

    let mut iword = 0;
    for (istr, &char) in str.iter().enumerate() {
        while char != word[iword] && iword > 0 {
            iword = next[iword - 1];
        }

        if char == word[iword] {
            iword += 1;
        }

        if iword == word.len() {
            res.push(istr + 1 - iword);
            iword = next[iword - 1];
        }
    }

    res
}

fn main() {
    // let index = knuth_morris_pratt("abaacababcac".to_string(), "ababc".to_string());
    let index = knuth_morris_pratt("ababcabcacbab".to_string(), "abcac".to_string());
    println!("{:?}", index);
}
/*
// w =  a      p[0]
        0
// w =  ab     p[0,0] pl=1
        00
// w =  aba    p[0,0,1] pl=2
        001
// w =  aba b   p[0,0,1,2] pl=3
        001 2
// w =  ababa  p[0,0,1,2,3]
        00123
// w =  aba[b]a b p[0,0,1,2,3,]
        001[2]3
*/
fn get_next(w: String) -> Vec<usize> {
    let mut partial = vec![0];
    let pattern = w.into_bytes();

    for new_index in 1..pattern.len() {
        let mut match_end = partial[new_index - 1];

        while match_end > 0 && pattern[match_end] != pattern[new_index] {
            match_end = partial[match_end - 1];
        }

        let match_end_item = pattern[match_end];
        let new_item = pattern[new_index];

        partial.push(if match_end_item == new_item {
            match_end + 1
        } else {
            match_end
        })
    }

    partial
}
/*
ababcabcacbab
     abcac
     00010
*/
fn kmp(s: String, w: String, next: Vec<usize>) -> Vec<usize> {
    let mut ret = vec![];
    let str = s.into_bytes();
    let pat = w.into_bytes();

    let mut j = 0;
    let mut i = 0;
    loop {
        if pat[j] == str[i] {
            j += 1;
            i += 1;

            if j == pat.len() {
                ret.push(i - j);
                j = next[j - 1];
                i += 1;
            }

            if i == str.len() {
                break;
            }
        }

        while pat[j] != str[i] && j > 0 {
            j = next[j - 1]
        }
    }

    ret
}

pub fn knuth_morris_pratt(st: String, pat: String) -> Vec<usize> {
    if st.is_empty() || pat.is_empty() {
        return vec![];
    }

    // build the partial match table
    let partial = get_next(pat.to_owned());

    kmp(st, pat, partial)
}

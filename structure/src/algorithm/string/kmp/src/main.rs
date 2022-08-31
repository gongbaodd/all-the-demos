
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
pub fn get_next(w: String) -> Vec<usize> {
    let mut partial = vec![0];
    let pattern = w.into_bytes();

    for new_index in 1..pattern.len() {
        let mut match_end = partial[new_index - 1];
        
        while match_end > 0 && pattern[match_end] != pattern[new_index] {
            match_end = partial[match_end - 1];
        }

        let match_end_item = pattern[match_end];
        let new_item = pattern[new_index];

        partial.push(if match_end_item == new_item { match_end+1 } else {match_end})

    }

    partial
}

pub fn knuth_morris_pratt(st: String, pat: String) -> Vec<usize> {
    if st.is_empty() || pat.is_empty() {
        return vec![];
    }

    let string = st.into_bytes();
    let pattern = pat.into_bytes();

    // build the partial match table
    let mut partial = vec![0];
    for i in 1..pattern.len() {
        let mut j = partial[i - 1];
        while j > 0 && pattern[j] != pattern[i] {
            j = partial[j - 1];
        }
        partial.push(if pattern[j] == pattern[i] { j + 1 } else { j });
    }

    // and read 'string' to find 'pattern'
    let mut ret = vec![];
    let mut j = 0;

    for (i, &c) in string.iter().enumerate() {
        while j > 0 && c != pattern[j] {
            j = partial[j - 1];
        }
        if c == pattern[j] {
            j += 1;
        }
        if j == pattern.len() {
            ret.push(i + 1 - j);
            j = partial[j - 1];
        }
    }

    ret
}
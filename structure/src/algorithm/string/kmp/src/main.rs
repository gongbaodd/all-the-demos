pub mod kmp_search;
use kmp_search::KMP;

pub fn main() {
    let str = "ababcabcacbababcac";
    let word = "abcac";

    let res = str.to_string().kmp(word.to_string());

    println!("{:?}", res);
}

#[cfg(test)]
mod test {
    use super::KMP;

    #[test]
    fn find_an_vector_of_two_values() {
        let str = "ababcabcacbababcac";
        let word = "abcac";

        let res = str.to_string().kmp(word.to_string());

        assert_eq!(res, vec![5, 13]);
    }
}

fn main() {
    let data = vec![33, 32, 39, 30, 22, 11, 44];

    let index = linear(22, &data);

    print!("{:?}", &index);
}

fn linear(num: i32, data: &Vec<i32>) -> Option<usize> {
    for (i, value) in data.iter().enumerate() {
        if value == &num {
            return Some(i);
        }
    }
    
    None
}


#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn should_equal_some_4 () {
        let data = vec![33, 32, 39, 30, 22, 11, 44];

        let index = linear(22, &data);
    
        assert_eq!(index, Some(4));
    }
}
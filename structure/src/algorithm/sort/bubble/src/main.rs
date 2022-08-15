fn main() {
    let mut data = vec![33, 32, 39, 30, 22, 11, 44];
    bubble(&mut data);
    println!("{:?}", &data);
}

fn bubble(data: &mut Vec<i32>) {
    for i in 0..data.len() {
        for j in i..data.len() {
            if data[j] < data[i] {
                data.swap(j, i);
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::bubble;

    #[test]
    fn test() {
        let mut data = vec![33, 32, 39, 30, 22, 11, 44];
        bubble(&mut data);
        assert_eq!(data, vec![11, 22, 30, 32, 33, 39, 44]);
    }
}

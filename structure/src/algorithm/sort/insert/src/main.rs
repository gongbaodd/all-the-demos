fn main() {
    let mut data = vec![33, 32, 39, 30, 22, 11, 44];

    insertion_sort(&mut data);

    println!("{:?}", data);
}

fn insertion_sort(data: &mut Vec<i32>) {
    for i in 1..data.len() {
        let mut j = i; // 依顺序选出一个元素
        while j > 0 && data[j] < data[j - 1] {
            data.swap(j, j - 1); // 这个元素挨个和前面比较并插入
            j = j - 1;
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test() {
        let mut data = vec![33, 32, 39, 30, 22, 11, 44];

        insertion_sort(&mut data);

        assert_eq!(data, vec![11, 22, 30, 32, 33, 39, 44]);
    }
}

fn main() {
    let mut data = vec![33, 32, 39, 30, 22, 11, 44];

    shell_sort(&mut data);

    println!("{:?}", data);
}

fn shell_sort(data: &mut Vec<i32>) {
    let len = data.len();
    let mut gap = len / 2;

    while gap > 0 {
        for i in gap..len {
            let mut j = i;
            while j >= gap && data[j] < data[j - gap] {
                data.swap(j, j - gap);
                j -= gap;
            }
        }
        gap /= 2;
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    pub fn test() {
        let mut data = vec![33, 32, 39, 30, 22, 11, 44];
        shell_sort(&mut data);

        assert_eq!(data, vec![11, 22, 30, 32, 33, 39, 44]);
    }
}

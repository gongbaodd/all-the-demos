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
            let temp = data[i];
            let mut j = i;

            while j >= gap && data[j - gap] > temp {
                data.swap(j, j - gap);
                j -= gap;
            }

            data[j] = temp;
        }

        gap /= 2;
    }
}

#[cfg(test)]
mod test {
    #[test]
    pub fn test() {}
}

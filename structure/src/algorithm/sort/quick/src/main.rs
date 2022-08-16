fn main() {
    let mut data = vec![33, 32, 39, 30, 22, 11, 44];
    quick(&mut data);
    println!("{:?}", data);
}

fn quick(data: &mut Vec<i32>) {
    _quick(data, 0, (data.len() - 1) as isize);
}

fn _quick(data: &mut Vec<i32>, start: usize, end: isize) {
    if end < start as isize {
        return;
    }

    let pivot_num = partition(data, start, end);
    _quick(data, start, (pivot_num as isize) - 1);
    _quick(data, pivot_num + 1, end);
}

fn partition(data: &mut Vec<i32>, start: usize, end: isize) -> usize {
    let mut low = start;
    let mut high = end as usize;
    let pivot = data[high];

    loop {
        while low < high && data[low] < pivot {
            low += 1;
        }
        data.swap(low, high);

        while low < high && data[high] > pivot {
            high -= 1;
        }
        data.swap(low, high);

        if low == high {
            break;
        }
    }

    low
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        let mut data = vec![33, 32, 39, 30, 22, 11, 44];
        quick(&mut data);
        assert_eq!(data, vec![11, 22, 30, 32, 33, 39, 44]);
    }
}

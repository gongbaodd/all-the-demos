fn main() {
    let mut data = vec![33, 32, 39, 30, 22, 11, 44];

    merge_sort(&mut data);

    print!("{:?}", data);
}

fn merge(a: &Vec<i32>, b: &Vec<i32>, data: &mut Vec<i32>) {
    let mut ia = 0;
    let mut ib = 0;
    let mut id = 0;

    while ia < a.len() && ib < b.len() {
        if a[ia] < b[ib] {
            data[id] = a[ia];
            ia += 1;
        } else {
            data[id] = b[ib];
            ib += 1;
        }
        id += 1;
    }

    if ia < a.len() {
        data[id..].copy_from_slice(&a[ia..]);
    }

    if ib < b.len() {
        data[id..].copy_from_slice(&b[ib..]);
    }
}

fn merge_sort(data: &mut Vec<i32>) {
    let length = data.len();
    let middle = data.len() / 2;

    if length > 1 {
        let mut a = data[0..middle].to_vec();
        let mut b = data[middle..length].to_vec();
        merge_sort(&mut a);
        merge_sort(&mut b);
        merge(&a, &b, data);
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        let mut data = vec![33, 32, 39, 30, 22, 11, 44];
        merge_sort(&mut data);
        assert_eq!(data, vec![11, 22, 30, 32, 33, 39, 44]);
    }
}

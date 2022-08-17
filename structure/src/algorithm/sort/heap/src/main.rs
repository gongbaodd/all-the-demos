fn main() {
    let mut data = vec![33, 32, 39, 30, 22, 11, 44];
    heap(&mut data);
    println!("{:?}", data);
}

fn heap(data: &mut Vec<i32>) {
    if data.len() < 2 {
        return ;
    }

    // build one max heap
    let last_root = (data.len() + 2) / 2;
    for root in (0..=last_root).rev() {
        to_max_heap(data, root, data.len() - 1);
    }

    // replace the first element(max element) to the last
    // make max heap using the other elements
    for last in (1..data.len()).rev() {
        data.swap(0, last);
        to_max_heap(data, 0, last-1);
    }
}

fn to_max_heap(data: &mut Vec<i32>, mut root: usize, last: usize) {
    loop {
        let left = root * 2 + 1;
        let right = left + 1;
        let max_child;

        if left > last {
            break;
        }

        if right > last {
            max_child = left;
        } else {
            max_child = if data[right] > data[left] {
                right
            } else {
                left
            }
        }

        if data[max_child] > data[root] {
            data.swap(max_child, root);
        }

        root = max_child;
    }
}
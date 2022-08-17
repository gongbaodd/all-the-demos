fn main() {
    let mut data = vec![33, 32, 39, 30, 22, 11, 44];
    heap(&mut data);
    println!("{:?}", data);
}

fn heap<T: Ord>(data: &mut [T]) {
    if data.len() <= 1 {
        return;
    }

    heapify(data);

    for end in (1..data.len()).rev() {
        data.swap(0, end);
        move_down(&mut data[..end], 0);
    }
}

fn heapify<T: Ord>(data: &mut [T]) {
    /*
                [0]33
        [1]32          [2]39
    [3]30   [4]22  [5]11    [6]44
    */

    let last_parent = (data.len() - 2) / 2;

    for i in (0..=last_parent).rev() {
        move_down(data, i);
    }
}

fn move_down<T: Ord>(data: &mut [T], mut root: usize) {
    let last = data.len() - 1;

    loop {
        let left = 2 * root + 1;
        if left > last {
            break;
        }
        let right = left + 1;
        let max = if right < last && data[right] > data[left] {
            right
        } else {
            left
        };

        if data[max] > data[root] {
            data.swap(root, max);
        }
        root = max;
    }
}

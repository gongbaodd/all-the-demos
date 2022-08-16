fn main() {
    let mut data = vec![33, 32, 39, 30, 22, 11, 44];
    println!("{:?}", data);
}

fn heap<T: Ord>(data: &mut [T]) {
    if data.len() <= 1 {
        return;
    }
}

fn heapify<T: Ord>(data: &mut [T]) {
    /*
            33
        32      39
    30     22  11    44
    */

    let last_parent = (data.len() - 2) / 2;

    for i in (0..=last_parent).rev() {
        move_down(data, i);
    }
}

fn move_down<T: Ord>(data: &mut [T], mut root: usize) {}

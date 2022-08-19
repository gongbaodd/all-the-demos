fn main() {
    let data = vec![11, 22, 30, 32, 33, 39, 44];
    let index = binary(&68, &data);
    print!("{:?}", index);
}

fn binary(item: &i32, items: &Vec<i32>) -> Option<usize> {
    bsearch(item, items, 0, items.len()-1)
}

fn bsearch(item: &i32, items: &Vec<i32>, low: usize, high: usize) -> Option<usize> {
    if low >= high {
        return None;
    }

    let middle = (low + high)/2;

    if item < &items[middle] {
        return bsearch(item, items, low, middle - 1);
    }

    if item == &items[middle] {
        return Some(middle);
    }

    if item > &items[middle] {
        return bsearch(item, items, middle + 1, high);
    }

    None
}

#[cfg(test)] 
mod test {
    use super::*;
    #[test]
    fn should_equal_some_1() {
        let data = vec![11, 22, 30, 32, 33, 39, 44];
        let index = binary(&22, &data);
        assert_eq!(index, Some(1));
    }
    
    #[test]
    fn should_equal_none() {
        let data = vec![11, 22, 30, 32, 33, 39, 44];
        let index = binary(&68, &data);
        assert_eq!(index, None);
    }
}
package main

import "fmt"

func main() {
	str := "ababcabcacbababcac"
	word := "abcac"

	fmt.Println(kmp(str, word))
}

func kmp(str string, word string) []int {
	next := getNext(word)

	return kmp_search(str, word, next)
}

func getNext(word string) []int {
	next := make([]int, 0)

	for inext, char := range word {
		if inext == 0 {
			next = append(next, 0)
			continue
		}

		imatched := next[inext-1]

		for {
			if imatched > 0 && word[imatched] != byte(char) {
				imatched = next[imatched-1]
			} else {
				break
			}
		}

		if word[imatched] == byte(char) {
			next = append(next, imatched+1)
		} else {
			next = append(next, imatched)
		}
	}

	return next
}

func kmp_search(str string, word string, next []int) []int {
	res := make([]int, 0)

	var iword int = 0
	for istr, char := range str {
		for {
			if word[iword] != byte(char) && iword > 0 {
				iword = next[iword-1]
			} else {
				break
			}
		}

		if word[iword] == byte(char) {
			iword++
		}

		if int(iword) == len(word) {
			res = append(res, istr-int(iword)+1)
			iword = next[iword-1]
		}
	}

	return res
}

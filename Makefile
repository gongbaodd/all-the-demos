# blah: blah.o
#	 cc blah.o -o blah
# blah.o: blah.c
#	 cc -c blah.c -o blah.o
# blah.c:
#	 echo "int main() { return 0; }" > blah.c
# some_file:
#	 echo "This line will only print once"
#	 touch some_file
# clean:
#	 rm -f blah blah.o blah.c

# files := file1 file2
# some_file: $(files)
#	echo "Look at the variable: " $(files)
#	touch some_file

# file1:
# 	touch file1
# file2:
# 	touch file2

# clean:
# 	rm -f file2 file1 some_file
# 
# thing_wrong := *.o
# thing_right := $(wildcard *.o)
# 
# all: one two three
#  
# one: $(thing_wrong)
# 
# two: *.o
# 
# three: $(thing_right)
#  
# four: $(wildcard *.o)

# hey: one two
# 	echo $@
# 	# echo $?
# 	echo $^
# 	touch hey
# 
# one:
# 	touch one
# 
# two:
# 	touch two
# 
# clean:
# 	rm -f hey one two

CC = gcc
CFLAGS = -g	

blah: blah.o

blah.c:
	echo "int main() { return 0; }" > blah.c	

clean:
	rm -f blah*

bar := ${subst not,totally, "I am not groot"}

all:
	@echo $(bar)

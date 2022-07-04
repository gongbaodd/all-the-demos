cmake_minimum_required(VERSION 3.5)

project(catch2_unit_test)

set(CMAKE_CXX_STANDARD 11)

add_subdirectory(vendor/catch2)

add_library(example_unit_test
    Reverse.cpp
    Palindrome.cpp
)

enable_testing()

add_executable(unit_tests unit_tests.cpp)

target_link_libraries(unit_tests
    example_unit_test
    Catch2::Test
)

add_test(test_all unit_tests)
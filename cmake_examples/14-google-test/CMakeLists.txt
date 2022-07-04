cmake_minimum_required(VERSION 3.5)

project(google_test_example)

add_library(example_google_test
    Reverse.cpp
    Palindrome.cpp
)

add_subdirectory(vendor/google-test)

enable_testing()

add_executable(unit_tests unit_tests.cpp)

target_link_libraries(unit_tests
    example_google_test
    GTest::GTest
    GTest::Main
)

add_test(test_all unit_test)
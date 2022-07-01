cmake_minimum_required(VERSION 3.5)

project(boost_unit_test)

find_package(Boost 1.46.1 REQUIRED COMPONENTS unit_test_framework)

add_library(example_boost_unit_test
    Reverse.cpp
    Palindrome.cpp
)

target_include_directories(example_boost_unit_test
    PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIRSOURCE_DIR}
)

target_link_libraries(example_boost_unit_test
    PUBLIC
    Boost::boost
)

enable_testing()

add_executable(unit_tests unit_tests.cpp)

target_link_libraries(unit_tests
    example_boost_unit_test
    Boost::unit_test_framework
)

target_compile_definitions(unit_tests
    PRIVATE
    BOOST_TEST_DYN_LINK
)

add_test(test_all unit_tests)
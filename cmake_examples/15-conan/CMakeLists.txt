cmake_minimum_required(VERSION 3.5)
project(conan)

set(CMAKE_CXX_STANDARD 11)

find_package(fmt)

include(${CMAKE_BINARY_DIR}/conanbuildinfo.cmake)
conan_basic_setup()

add_executable(v_include main.cpp)

target_link_libraries(v_include
    PRIVATE
    ${CONAN_LIBS}
)

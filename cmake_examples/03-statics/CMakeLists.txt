cmake_minimum_required(VERSION 3.5)

project(hello_static)

add_library(hello_static STATIC
    src/Hello.cpp
)

target_include_directories(hello_static
    PUBLIC
    ${PROJECT_SOURCE_DIR}/include
)

add_executable(hello_binary
    src/main.cpp
)

target_link_libraries(hello_binary
    PRIVATE
    hello_static
)
cmake_minimum_required(VERSION 3.5)

project(hello_shared)

add_library(hello_shared SHARED
    src/Hello.cpp
)

add_library(hello::library ALIAS hello_shared)

target_include_directories(hello_shared
    PUBLIC
    ${PROJECT_SOURCE_DIR}/include
)

add_executable(hello_binary
    src/main.cpp
)

target_link_libraries(hello_binary
    PRIVATE
    hello::library
)
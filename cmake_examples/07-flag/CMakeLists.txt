cmake_minimum_required(VERSION 3.5)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DEX2" CACHE STRING "Set C++ Compiler Flags" FORCE)
project(compile_flags)

add_executable(cmake_flags main.cpp)

target_compile_definitions(cmake_flags PRIVATE EX3)
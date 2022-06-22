cmake_minimum_required(VERSION 3.5)

project(cf)

set(CF_VERSION_MAJOR 0)
set(CF_VERSION_MINOR 2)
set(CF_VERSION_PATCH 1)
set(CF_VERSION "${CF_VERSION_MAJOR}.${CF_VERSION_MINOR}.${CF_VERSION_PATCH}")

configure_file(ver.h.in ${PROJECT_BINARY_DIR}/ver.h)
configure_file(path.h.in ${PROJECT_BINARY_DIR}/path.h @ONLY)

add_executable(cf main.cpp)

target_include_directories(cf PUBLIC ${CMAKE_BINARY_DIR})
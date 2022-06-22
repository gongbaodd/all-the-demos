cmake_minimum_required(VERSION 3.5)

project(vendor)

find_package(Boost 1.46.1 REQUIRED COMPONENTS filesystem system)

if(Boost_FOUND)
    message("boost found")
else()
    message(FATAL_ERROR "Cannot find Boost")
endif()

add_executable(vendor main.cpp)

target_link_libraries(vendor
    PRIVATE Boost::filesystem)
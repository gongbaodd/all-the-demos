cmake_minimum_required(VERSION 3.0.0)
project(gl VERSION 0.1.0)

include(CTest)
enable_testing()

add_executable(gl src/main.cpp)

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)

find_package(opengl_system)
target_link_libraries(${PROJECT_NAME} opengl::opengl)

find_package(glfw3)
target_link_libraries(${PROJECT_NAME} glfw)
cmake_minimum_required(VERSION 3.5)

project(hello)

aux_source_directory(. SRC_LIST)

set(wxWidgets_CONFIGURATION mswu)
find_package(wxWidgets COMPONENTS core base REQUIRED)
include(${wxWidgets_USE_FILE})

SET(CMAKE_CXX_STANDARD 11)
SET(CMAKE_CXX_STANDARD_REQUIRED ON)
include(${CMAKE_BINARY_DIR}/conanbuildinfo.cmake)
conan_basic_setup()

add_executable(hello ${SRC_LIST})
target_link_libraries(hello ${CONAN_LIBS})
target_link_libraries(${PROJECT_NAME} ${wxWidgets_LIBRARIES})

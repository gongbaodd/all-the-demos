cmake_minimum_required(VERSION 3.5)

project(cmake_install)

add_library(cmake_inst SHARED
    src/Hello.cpp
)

target_include_directories(cmake_inst
    PUBLIC
    ${PROJECT_SOURCE_DIR}/include
)

add_executable(cmake_inst_bin
    src/main.cpp
)

target_link_libraries(cmake_inst_bin
    PRIVATE
    cmake_inst
)

install(TARGETS cmake_inst
    LIBRARY DESTINATION lib
)

install(DIRECTORY ${PROJECT_SOURCE_DIR}/include/
    DESTINATION include
)

install(FILES cmake-example.conf
    DESTINATION etc
)
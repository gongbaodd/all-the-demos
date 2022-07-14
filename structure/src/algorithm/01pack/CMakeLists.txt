cmake_minimum_required(VERSION 3.5)
project(01_pack VERSION 0.1.0)

include(CTest)
enable_testing()

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})

include(CPack)

set(SOURCES
    main.cpp
    item.cpp
    pack.cpp
    packState.cpp
)

add_executable(01_pack ${SOURCES})

target_include_directories(01_pack PRIVATE include)
cmake_minimum_required(VERSION 3.5)
project(01_pack VERSION 0.1.0)

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

include(CTest)
enable_testing()

add_executable(unit_test
    ${SOURCES}
    test/pack.cc
)

target_include_directories(unit_test PRIVATE include)

# GoogleTest requires at least C++14
set(CMAKE_CXX_STANDARD 14)

include(FetchContent)
FetchContent_Declare(
    googletest
    GIT_REPOSITORY https://github.com/google/googletest.git
    GIT_TAG release-1.12.1
)

# For Windows: Prevent overriding the parent project's compiler/linker settings
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

target_link_libraries(unit_test GTest::gtest_main)

add_test(test_all unit_test)
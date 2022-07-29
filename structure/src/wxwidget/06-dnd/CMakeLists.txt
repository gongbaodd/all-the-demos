# set(wxWidgets_ROOT_DIR "C:/wxWidgets-3.2.0")
# set(wxWidgets_LIB_DIR "C:/wxWidgets-3.2.0/lib/vc14x_x64_dll")
# set(wxWidgets_INCLUDE_DIRS "C:/wxWidgets-3.2.0/include")

set(CMAKE_SYSTEM_NAME Windows)
set(TOOLCHAIN_PREFIX x86_64-w64-mingw32)

# cross compilers to use for C, C++ and Fortran
set(CMAKE_C_COMPILER ${TOOLCHAIN_PREFIX}-gcc)
set(CMAKE_CXX_COMPILER ${TOOLCHAIN_PREFIX}-g++)
set(CMAKE_Fortran_COMPILER ${TOOLCHAIN_PREFIX}-gfortran)
set(CMAKE_RC_COMPILER ${TOOLCHAIN_PREFIX}-windres)

# target environment on the build host system
set(CMAKE_FIND_ROOT_PATH /usr/${TOOLCHAIN_PREFIX})

# modify default behavior of FIND_XXX() commands
set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)

cmake_minimum_required(VERSION 3.0.0)
project(dnd VERSION 0.1.0)

include(CTest)
enable_testing()

aux_source_directory(. SRC_LIST)
set(wxWidgets_CONFIGURATION mswu)

# find_package(wxWidgets REQUIRED COMPONENTS core base)
# include(${wxWidgets_USE_FILE})
add_executable(dnd ${SRC_LIST})

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)

# arget_link_libraries(${PROJECT_NAME} ${wxWidgets_LIBRARIES})
# target_include_directories(${PROJECT_NAME} PUBLIC include)
add_subdirectory(wxWidgets-3.2.0)
target_link_libraries(dnd wx::net wx::core wx::base)
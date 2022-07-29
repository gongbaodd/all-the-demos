# set(wxWidgets_ROOT_DIR "C:/wxWidgets-3.2.0")
# set(wxWidgets_LIB_DIR "C:/wxWidgets-3.2.0/lib/vc14x_x64_dll")
# set(wxWidgets_INCLUDE_DIRS "C:/wxWidgets-3.2.0/include")

cmake_minimum_required(VERSION 3.0.0)
project(dnd VERSION 0.1.0)

include(CTest)
enable_testing()

aux_source_directory(. SRC_LIST)
set(wxWidgets_CONFIGURATION mswu)
find_package(wxWidgets REQUIRED COMPONENTS core base)
include(${wxWidgets_USE_FILE})

add_executable(dnd ${SRC_LIST})

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)

target_link_libraries(${PROJECT_NAME} ${wxWidgets_LIBRARIES})
target_include_directories(${PROJECT_NAME} PUBLIC include)

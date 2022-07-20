cmake_minimum_required(VERSION 3.0.0)
project(first VERSION 0.1.0)

aux_source_directory(. SRC_LIST)

set(wxWidgets_CONFIGURATION mswu)
find_package(wxWidgets COMPONENTS core base REQUIRED)
include(${wxWidgets_USE_FILE})

include(CTest)
enable_testing()

add_executable(first ${SRC_LIST})
set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)
target_link_libraries(${PROJECT_NAME} ${wxWidgets_LIBRARIES})
target_include_directories(${PROJECT_NAME} PUBLIC include)

cmake_minimum_required(VERSION 3.0.0)
project(events VERSION 0.1.0)

include(CTest)
enable_testing()

aux_source_directory(. SRC_LIST)
set(wxWidgets_CONFIGURATION mswu)
find_package(wxWidgets COMPONENTS core base REQUIRED)
include(${wxWidgets_USE_FILE})

add_executable(events ${SRC_LIST})

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)

target_link_libraries(${PROJECT_NAME} ${wxWidgets_LIBRARIES})
target_include_directories(${PROJECT_NAME} PUBLIC include)

cmake_minimum_required(VERSION 3.5)

project(protobuf)

find_package(Protobuf REQUIRED)

if(PROTOBUF_FOUND)
    message("protobuf found")
else()
    message(FATAL_ERROR "Cannot find Protobuf")
endif()

PROTOBUF_GENERATE_CPP(PROTO_SRCS PROTO_HDRS AddressBook.proto)

message("PROTO_SRCS = ${PROTO_SRCS}")
message("PROTO_HDRS = ${PROTO_HDRS}")

add_executable(protobuf
    main.cpp
    ${PROTO_SRCS}
    ${PROTO_HDRS})

target_include_directories(protobuf
    PUBLIC
    ${PROTOBUF_INCLUDE_DIRS}
    ${CMAKE_CURRENT_BINARY_DIR})

target_link_libraries(protobuf
    PUBLIC
    ${PROTOBUF_LIBRARIES})
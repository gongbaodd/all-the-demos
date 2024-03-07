/**
 * Copyright (c) Facebook, Inc. and its affiliates
 * SPDX-License-Identifier: MIT OR Apache-2.0
 */
export declare type Optional<T> = T | null;
export declare type Seq<T> = T[];
export declare type Tuple<T extends any[]> = T;
export declare type ListTuple<T extends any[]> = Tuple<T>[];
export declare type unit = null;
export declare type bool = boolean;
export declare type int8 = number;
export declare type int16 = number;
export declare type int32 = number;
export declare type int64 = bigint;
export declare type int128 = bigint;
export declare type uint8 = number;
export declare type uint16 = number;
export declare type uint32 = number;
export declare type uint64 = bigint;
export declare type uint128 = bigint;
export declare type float32 = number;
export declare type float64 = number;
export declare type char = string;
export declare type str = string;
export declare type bytes = Uint8Array;

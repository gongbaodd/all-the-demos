"use client";


import { update } from "@/lib/core";
import { useEffect, useState, useRef, useSyncExternalStore } from "react"
import { EventVariantNone, ViewModel } from "shared_types/types/shared_types"
import init from "shared/shared"
import HelloModel from "@/models/hello"


export default function Hello() {
    const view = useSyncExternalStore(HelloModel.subscribe, HelloModel.getSnapshot)

    return <p>{view.data}</p>
}
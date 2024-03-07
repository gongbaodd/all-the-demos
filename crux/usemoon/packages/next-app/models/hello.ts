import { EventVariantNone, ViewModel } from "shared_types/types/shared_types"
import init from "shared/shared"
import { update } from "@/lib/core"

let vModel = new ViewModel("")
let listeners: Function[] = []

export default {
    subscribe(callback: Function) {
        listeners.push(callback)

        return () => {
            listeners = listeners.filter(l => l === callback)
        }
    },
    getSnapshot() {
        return vModel
    }
}

function emitChange() {
    for (const listener of listeners) {
        listener()
    }
}

init().then(() => {
    update(new EventVariantNone(), vm => {
        vModel = vm as ViewModel
    })
    emitChange()
})
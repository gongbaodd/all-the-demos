"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = exports.ViewModel = exports.Request = exports.RenderOperation = exports.EventVariantNone = exports.Event = exports.EffectVariantRender = exports.Effect = void 0;
class Effect {
    static deserialize(deserializer) {
        const index = deserializer.deserializeVariantIndex();
        switch (index) {
            case 0: return EffectVariantRender.load(deserializer);
            default: throw new Error("Unknown variant index for Effect: " + index);
        }
    }
}
exports.Effect = Effect;
class EffectVariantRender extends Effect {
    constructor(value) {
        super();
        this.value = value;
    }
    serialize(serializer) {
        serializer.serializeVariantIndex(0);
        this.value.serialize(serializer);
    }
    static load(deserializer) {
        const value = RenderOperation.deserialize(deserializer);
        return new EffectVariantRender(value);
    }
}
exports.EffectVariantRender = EffectVariantRender;
class Event {
    static deserialize(deserializer) {
        const index = deserializer.deserializeVariantIndex();
        switch (index) {
            case 0: return EventVariantNone.load(deserializer);
            default: throw new Error("Unknown variant index for Event: " + index);
        }
    }
}
exports.Event = Event;
class EventVariantNone extends Event {
    constructor() {
        super();
    }
    serialize(serializer) {
        serializer.serializeVariantIndex(0);
    }
    static load(deserializer) {
        return new EventVariantNone();
    }
}
exports.EventVariantNone = EventVariantNone;
class RenderOperation {
    constructor() {
    }
    serialize(serializer) {
    }
    static deserialize(deserializer) {
        return new RenderOperation();
    }
}
exports.RenderOperation = RenderOperation;
class Request {
    constructor(uuid, effect) {
        this.uuid = uuid;
        this.effect = effect;
    }
    serialize(serializer) {
        Helpers.serializeVectorU8(this.uuid, serializer);
        this.effect.serialize(serializer);
    }
    static deserialize(deserializer) {
        const uuid = Helpers.deserializeVectorU8(deserializer);
        const effect = Effect.deserialize(deserializer);
        return new Request(uuid, effect);
    }
}
exports.Request = Request;
class ViewModel {
    constructor(data) {
        this.data = data;
    }
    serialize(serializer) {
        serializer.serializeStr(this.data);
    }
    static deserialize(deserializer) {
        const data = deserializer.deserializeStr();
        return new ViewModel(data);
    }
}
exports.ViewModel = ViewModel;
class Helpers {
    static serializeVectorU8(value, serializer) {
        serializer.serializeLen(value.length);
        value.forEach((item) => {
            serializer.serializeU8(item);
        });
    }
    static deserializeVectorU8(deserializer) {
        const length = deserializer.deserializeLen();
        const list = [];
        for (let i = 0; i < length; i++) {
            list.push(deserializer.deserializeU8());
        }
        return list;
    }
}
exports.Helpers = Helpers;

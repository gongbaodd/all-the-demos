"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = exports.ViewModel = exports.Request = exports.RenderOperation = exports.HttpErrorVariantTimeout = exports.HttpErrorVariantIo = exports.HttpErrorVariantUrl = exports.HttpError = exports.EventVariantReset = exports.EventVariantDecrement = exports.EventVariantIncrement = exports.Event = exports.EffectVariantRender = exports.Effect = void 0;
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
            case 0: return EventVariantIncrement.load(deserializer);
            case 1: return EventVariantDecrement.load(deserializer);
            case 2: return EventVariantReset.load(deserializer);
            default: throw new Error("Unknown variant index for Event: " + index);
        }
    }
}
exports.Event = Event;
class EventVariantIncrement extends Event {
    constructor() {
        super();
    }
    serialize(serializer) {
        serializer.serializeVariantIndex(0);
    }
    static load(deserializer) {
        return new EventVariantIncrement();
    }
}
exports.EventVariantIncrement = EventVariantIncrement;
class EventVariantDecrement extends Event {
    constructor() {
        super();
    }
    serialize(serializer) {
        serializer.serializeVariantIndex(1);
    }
    static load(deserializer) {
        return new EventVariantDecrement();
    }
}
exports.EventVariantDecrement = EventVariantDecrement;
class EventVariantReset extends Event {
    constructor() {
        super();
    }
    serialize(serializer) {
        serializer.serializeVariantIndex(2);
    }
    static load(deserializer) {
        return new EventVariantReset();
    }
}
exports.EventVariantReset = EventVariantReset;
class HttpError {
    static deserialize(deserializer) {
        const index = deserializer.deserializeVariantIndex();
        switch (index) {
            case 0: return HttpErrorVariantUrl.load(deserializer);
            case 1: return HttpErrorVariantIo.load(deserializer);
            case 2: return HttpErrorVariantTimeout.load(deserializer);
            default: throw new Error("Unknown variant index for HttpError: " + index);
        }
    }
}
exports.HttpError = HttpError;
class HttpErrorVariantUrl extends HttpError {
    constructor(value) {
        super();
        this.value = value;
    }
    serialize(serializer) {
        serializer.serializeVariantIndex(0);
        serializer.serializeStr(this.value);
    }
    static load(deserializer) {
        const value = deserializer.deserializeStr();
        return new HttpErrorVariantUrl(value);
    }
}
exports.HttpErrorVariantUrl = HttpErrorVariantUrl;
class HttpErrorVariantIo extends HttpError {
    constructor(value) {
        super();
        this.value = value;
    }
    serialize(serializer) {
        serializer.serializeVariantIndex(1);
        serializer.serializeStr(this.value);
    }
    static load(deserializer) {
        const value = deserializer.deserializeStr();
        return new HttpErrorVariantIo(value);
    }
}
exports.HttpErrorVariantIo = HttpErrorVariantIo;
class HttpErrorVariantTimeout extends HttpError {
    constructor() {
        super();
    }
    serialize(serializer) {
        serializer.serializeVariantIndex(2);
    }
    static load(deserializer) {
        return new HttpErrorVariantTimeout();
    }
}
exports.HttpErrorVariantTimeout = HttpErrorVariantTimeout;
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
    constructor(count) {
        this.count = count;
    }
    serialize(serializer) {
        serializer.serializeStr(this.count);
    }
    static deserialize(deserializer) {
        const count = deserializer.deserializeStr();
        return new ViewModel(count);
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

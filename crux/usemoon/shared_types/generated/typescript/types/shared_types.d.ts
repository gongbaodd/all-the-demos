import { Serializer, Deserializer } from '../serde/mod';
import { Seq, uint8, str } from '../serde/mod';
export declare abstract class Effect {
    abstract serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): Effect;
}
export declare class EffectVariantRender extends Effect {
    value: RenderOperation;
    constructor(value: RenderOperation);
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): EffectVariantRender;
}
export declare abstract class Event {
    abstract serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): Event;
}
export declare class EventVariantNone extends Event {
    constructor();
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): EventVariantNone;
}
export declare class RenderOperation {
    constructor();
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): RenderOperation;
}
export declare class Request {
    uuid: Seq<uint8>;
    effect: Effect;
    constructor(uuid: Seq<uint8>, effect: Effect);
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): Request;
}
export declare class ViewModel {
    data: str;
    constructor(data: str);
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): ViewModel;
}
export declare class Helpers {
    static serializeVectorU8(value: Seq<uint8>, serializer: Serializer): void;
    static deserializeVectorU8(deserializer: Deserializer): Seq<uint8>;
}

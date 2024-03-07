
import { Serializer, Deserializer } from '../serde/mod';

import { Optional, Seq, Tuple, ListTuple, unit, bool, int8, int16, int32, int64, int128, uint8, uint16, uint32, uint64, uint128, float32, float64, char, str, bytes } from '../serde/mod';

export abstract class Effect {
abstract serialize(serializer: Serializer): void;

static deserialize(deserializer: Deserializer): Effect {
  const index = deserializer.deserializeVariantIndex();
  switch (index) {
    case 0: return EffectVariantRender.load(deserializer);
    default: throw new Error("Unknown variant index for Effect: " + index);
  }
}
}


export class EffectVariantRender extends Effect {

constructor (public value: RenderOperation) {
  super();
}

public serialize(serializer: Serializer): void {
  serializer.serializeVariantIndex(0);
  this.value.serialize(serializer);
}

static load(deserializer: Deserializer): EffectVariantRender {
  const value = RenderOperation.deserialize(deserializer);
  return new EffectVariantRender(value);
}

}
export abstract class Event {
abstract serialize(serializer: Serializer): void;

static deserialize(deserializer: Deserializer): Event {
  const index = deserializer.deserializeVariantIndex();
  switch (index) {
    case 0: return EventVariantNone.load(deserializer);
    default: throw new Error("Unknown variant index for Event: " + index);
  }
}
}


export class EventVariantNone extends Event {
constructor () {
  super();
}

public serialize(serializer: Serializer): void {
  serializer.serializeVariantIndex(0);
}

static load(deserializer: Deserializer): EventVariantNone {
  return new EventVariantNone();
}

}
export class RenderOperation {
constructor () {
}

public serialize(serializer: Serializer): void {
}

static deserialize(deserializer: Deserializer): RenderOperation {
  return new RenderOperation();
}

}
export class Request {

constructor (public uuid: Seq<uint8>, public effect: Effect) {
}

public serialize(serializer: Serializer): void {
  Helpers.serializeVectorU8(this.uuid, serializer);
  this.effect.serialize(serializer);
}

static deserialize(deserializer: Deserializer): Request {
  const uuid = Helpers.deserializeVectorU8(deserializer);
  const effect = Effect.deserialize(deserializer);
  return new Request(uuid,effect);
}

}
export class ViewModel {

constructor (public data: str) {
}

public serialize(serializer: Serializer): void {
  serializer.serializeStr(this.data);
}

static deserialize(deserializer: Deserializer): ViewModel {
  const data = deserializer.deserializeStr();
  return new ViewModel(data);
}

}
export class Helpers {
  static serializeVectorU8(value: Seq<uint8>, serializer: Serializer): void {
    serializer.serializeLen(value.length);
    value.forEach((item: uint8) => {
        serializer.serializeU8(item);
    });
  }

  static deserializeVectorU8(deserializer: Deserializer): Seq<uint8> {
    const length = deserializer.deserializeLen();
    const list: Seq<uint8> = [];
    for (let i = 0; i < length; i++) {
        list.push(deserializer.deserializeU8());
    }
    return list;
  }

}



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
    case 0: return EventVariantIncrement.load(deserializer);
    case 1: return EventVariantDecrement.load(deserializer);
    case 2: return EventVariantReset.load(deserializer);
    default: throw new Error("Unknown variant index for Event: " + index);
  }
}
}


export class EventVariantIncrement extends Event {
constructor () {
  super();
}

public serialize(serializer: Serializer): void {
  serializer.serializeVariantIndex(0);
}

static load(deserializer: Deserializer): EventVariantIncrement {
  return new EventVariantIncrement();
}

}

export class EventVariantDecrement extends Event {
constructor () {
  super();
}

public serialize(serializer: Serializer): void {
  serializer.serializeVariantIndex(1);
}

static load(deserializer: Deserializer): EventVariantDecrement {
  return new EventVariantDecrement();
}

}

export class EventVariantReset extends Event {
constructor () {
  super();
}

public serialize(serializer: Serializer): void {
  serializer.serializeVariantIndex(2);
}

static load(deserializer: Deserializer): EventVariantReset {
  return new EventVariantReset();
}

}
export abstract class HttpError {
abstract serialize(serializer: Serializer): void;

static deserialize(deserializer: Deserializer): HttpError {
  const index = deserializer.deserializeVariantIndex();
  switch (index) {
    case 0: return HttpErrorVariantUrl.load(deserializer);
    case 1: return HttpErrorVariantIo.load(deserializer);
    case 2: return HttpErrorVariantTimeout.load(deserializer);
    default: throw new Error("Unknown variant index for HttpError: " + index);
  }
}
}


export class HttpErrorVariantUrl extends HttpError {

constructor (public value: str) {
  super();
}

public serialize(serializer: Serializer): void {
  serializer.serializeVariantIndex(0);
  serializer.serializeStr(this.value);
}

static load(deserializer: Deserializer): HttpErrorVariantUrl {
  const value = deserializer.deserializeStr();
  return new HttpErrorVariantUrl(value);
}

}

export class HttpErrorVariantIo extends HttpError {

constructor (public value: str) {
  super();
}

public serialize(serializer: Serializer): void {
  serializer.serializeVariantIndex(1);
  serializer.serializeStr(this.value);
}

static load(deserializer: Deserializer): HttpErrorVariantIo {
  const value = deserializer.deserializeStr();
  return new HttpErrorVariantIo(value);
}

}

export class HttpErrorVariantTimeout extends HttpError {
constructor () {
  super();
}

public serialize(serializer: Serializer): void {
  serializer.serializeVariantIndex(2);
}

static load(deserializer: Deserializer): HttpErrorVariantTimeout {
  return new HttpErrorVariantTimeout();
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

constructor (public count: str) {
}

public serialize(serializer: Serializer): void {
  serializer.serializeStr(this.count);
}

static deserialize(deserializer: Deserializer): ViewModel {
  const count = deserializer.deserializeStr();
  return new ViewModel(count);
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


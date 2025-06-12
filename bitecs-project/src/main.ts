import { addComponent, addEntity, createWorld, defineComponent, defineQuery, pipe, Types, type IWorld } from "bitecs";

const Vector3 = {x: Types.f32, y: Types.f32, z: Types.f32};
const Position = defineComponent(Vector3);
const Velocity = defineComponent(Vector3);
const world = createWorld({
  time: {
    delta: 0,
    elapsed: 0,
    then: performance.now(),
  }
});
type TWorld = typeof world;

const movementQuery = defineQuery([Position, Velocity]);

const movementSystem = (world: TWorld) => {
  const ents = movementQuery(world);
  for (const eid of ents) {
    Position.x[eid] += Velocity.x[eid];
    Position.y[eid] += Velocity.y[eid];
    Position.z[eid] += Velocity.z[eid];
  }
  return world;
}

const timeSystem = (world: TWorld) => {
  const { time: { then } } = world;
  world.time.delta = performance.now() - then;
  world.time.elapsed += world.time.delta;
  world.time.then = performance.now();
  return world;
}

const pipeline = pipe(movementSystem, timeSystem);

const eid = addEntity(world);
addComponent(world, Position, eid);
addComponent(world, Velocity, eid);

setInterval(() => {
  pipeline(world);
}, 1000 / 60);
import { createWorld, addEntity, defineComponent, Types, defineQuery, addComponent } from "bitecs";

export const world = createWorld();

// 定义 Position 组件
export const Position = defineComponent({
  x: Types.f32,
  y: Types.f32,
  z: Types.f32,
});

// 定义 Velocity 组件（可选）
export const Velocity = defineComponent({
  x: Types.f32,
  y: Types.f32,
  z: Types.f32,
});

// 创建两个实体
export const eid0 = addEntity(world);
addComponent(world, Position, eid0);


export const eid1 = addEntity(world);
addComponent(world, Position, eid1);

// 初始化组件
Position.x[eid0] = 1;
Position.y[eid0] = 0;
Position.z[eid0] = 1;

Position.x[eid1] = -1;
Position.y[eid1] = 0;
Position.z[eid1] = -1;

// 一个查询：所有有 Position 的实体
export const positionQuery = defineQuery([Position]);

// 每帧更新位置（例子：简单向上移动）
export function updateECS() {
  for (const eid of positionQuery(world)) {
    // Position.y[eid] += 0.01; // 向上移动
  }
}
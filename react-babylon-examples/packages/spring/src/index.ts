import { Globals } from '@react-spring/core';
import { createHost } from '@react-spring/animated';
import { createStringInterpolator } from '@react-spring/shared';
import { primitives } from './primitives';
import { applyInitialPropsToInstance } from 'react-babylonjs/dist/plugins';
import { WithAnimated } from './animated';

// todo: frameLoop can use runRenderLoop
Globals.assign({
  createStringInterpolator,
});

const host = createHost(primitives, {
  applyAnimatedValues: applyInitialPropsToInstance,
});
export const animated = host.animated;

export * from '@react-spring/core';

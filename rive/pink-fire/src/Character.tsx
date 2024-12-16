import Rive, {useRive} from '@rive-app/react-canvas';

export const Simple = () => (
  <Rive
    src="./pink_2.riv"
    stateMachines="State Machine 1"
  />
);

export const UrlDemo = () => {
    const { RiveComponent } = useRive({
      src: "./pink_2.riv",
      autoplay: true,
    });
    return <RiveComponent />;
  };
import {Camera, LineLayer, MapView, ShapeSource} from '@rnmapbox/maps';
import {ComponentProps, forwardRef, useRef} from 'react';
import {View} from 'react-native';

type CrosshairProps = {
  size: number;
  w: number;
  onLayout: ComponentProps<typeof View>['onLayout'];
};
const Crosshair = forwardRef<View, CrosshairProps>(
  ({size, w, onLayout}: CrosshairProps, ref) => (
    <View
      onLayout={onLayout}
      ref={ref}
      style={{
        width: 2 * size + 1,
        height: 2 * size + 1,
      }}>
      <View
        style={{
          position: 'absolute',
          left: size,
          top: 0,
          bottom: 0,
          borderColor: 'red',
          borderWidth: w / 2.0,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: size,
          left: 0,
          right: 0,
          borderColor: 'red',
          borderWidth: w / 2.0,
        }}
      />
    </View>
  ),
);

const CrosshairOverlay = ({
  onCenter,
}: {
  onCenter: (x: [number, number]) => void;
}) => {
  const ref = useRef<View>(null);

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      pointerEvents="none">
      <Crosshair
        size={20}
        w={1.0}
        ref={ref}
        onLayout={e => {
          const {x, y, width, height} = e.nativeEvent.layout;
          console.log({x, y, width, height});
          onCenter([x + width / 2.0, y + height / 2.0]);
        }}
      />
    </View>
  );
};

export default CrosshairOverlay;

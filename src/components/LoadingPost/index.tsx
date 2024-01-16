import withMemo from 'HOC/withMemo';
import React from 'react';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { scaleSize, width as screenWidth } from 'styles';

const LoadingPost = () => {
  const width = screenWidth - scaleSize(12);
  const x = scaleSize(12);
  const widthItem = width - scaleSize(12);

  return (
    <ContentLoader
      speed={2}
      interval={0.1}
      width={width}
      height={450}
      // backgroundColor={dynamicColors.concrete}
      // foregroundColor={dynamicColors.alto}
    >
      <Rect x={88} y={24} rx={3} ry={3} width={100} height={6} />
      <Rect x={88} y={42} rx={3} ry={3} width={72} height={6} />
      <Rect x={x} y={86} rx={3} ry={3} width={widthItem} height={6} />
      <Rect x={x} y={102} rx={3} ry={3} width={widthItem} height={6} />
      <Rect x={x} y={118} rx={3} ry={3} width={widthItem} height={6} />
      <Circle cx={44} cy={44} r={30} />
      <Rect x={x} y={139} rx={8} ry={8} width={widthItem} height={225} />
      <Rect x={x} y={375} rx={8} ry={8} width={widthItem} height={31} />
    </ContentLoader>
  );
};

export default withMemo(LoadingPost);

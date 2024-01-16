import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import IconStarFill from 'assets/icon/IconStarFill.svg';
import IconStarOutline from 'assets/icon/IconStarOutline.svg';

export interface IRatingStarsProps {
  readonly numberOfStars?: number;
  readonly ratingNumber: number;
  readonly size?: number;
}
const RatingStar = (props: IRatingStarsProps) => {
  const numberOfStars = props.numberOfStars ?? 5;
  const size = props.size ?? 16;
  const starsList = Array.from(Array(numberOfStars).keys());
  const [ratingNumber, setRatingNumber] = useState(props.ratingNumber);
  return (
    <View style={[globalStyles.flexDirectionRow]}>
      {starsList.map(star =>
        star <= ratingNumber ? (
          <TouchableOpacity onPress={() => setRatingNumber(star)} key={star}>
            <IconStarFill width={scaleSize(size)} height={scaleSize(size)} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setRatingNumber(star)}>
            <IconStarOutline width={scaleSize(size)} height={scaleSize(size)} />
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

export default RatingStar;

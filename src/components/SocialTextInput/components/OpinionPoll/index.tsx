import { View } from 'react-native';
import React, { forwardRef, memo, useCallback, useImperativeHandle } from 'react';
import { useStyles } from './styles';
import { PollItem } from './PollItem';
import { NewPollItem } from './NewPollItem';
import { EndDayPicker } from './EndDayPicker';
import { useAppSelector } from 'hooks';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { cloneDeep } from 'lodash';
import { PollData } from 'components/SocialTextInput/types';

const keyExtractor = (item: PollData) => item.id.toString();
const getInitData = () => {
  return cloneDeep([
    {
      data: '',
      id: 0,
    },
    {
      data: '',
      id: 1,
    },
  ]);
};

export type OpinionPoll = {
  getPollData: () =>
    | {
        options: string[];
        expires_in: number;
      }
    | undefined;
};

export const OpinionPoll = memo(
  forwardRef<OpinionPoll>((_, ref) => {
    const { styles } = useStyles();

    const initPoll = useAppSelector(state => state.SocialNewPost.initData?.poll);
    const [polls, setPolls] = React.useState<PollData[]>(
      initPoll == null
        ? getInitData()
        : initPoll.options.map((item, index) => ({
            data: item,
            id: index,
          }))
    );

    const [endDay, setEndDay] = React.useState<number>(3600 * 24); // Default 1 day

    const updatePolls = useCallback((updateItem: PollData) => {
      setPolls(pre => {
        const index = pre.findIndex(item => item.id === updateItem.id);
        if (index >= 0) {
          pre[index] = updateItem;
        }
        return [...pre];
      });
    }, []);

    const addNewPoll = useCallback(() => {
      setPolls(pre => [
        ...pre,
        {
          data: '',
          id: pre.length,
        },
      ]);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        getPollData: () => {
          const options = polls.filter(item => item.data !== '').map(item => item.data);
          const expires_in = endDay;
          if (options.length < 2) {
            return undefined;
          }
          return {
            options,
            expires_in,
          };
        },
      }),
      [polls, endDay]
    );

    const renderItem = useCallback(
      ({ item, drag, isActive }: RenderItemParams<PollData>) => {
        return <PollItem data={item} updatePolls={updatePolls} drag={drag} isActive={isActive} />;
      },
      [PollItem]
    );

    const onDragEnd = useCallback(({ data }) => {
      setPolls(data);
    }, []);

    return (
      <View style={styles.container}>
        <DraggableFlatList data={polls} onDragEnd={onDragEnd} keyExtractor={keyExtractor} renderItem={renderItem} />
        <NewPollItem addNewPoll={addNewPoll} />
        {initPoll == null && <EndDayPicker endDay={endDay} setEndDay={setEndDay} />}
      </View>
    );
  })
);

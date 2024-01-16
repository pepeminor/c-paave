import React from 'react';
import { IGetAllSymbolFavoriteResponse } from 'interfaces/favorite';
import withMemo from 'HOC/withMemo';
import SymbolTag2 from 'components/SymbolTag2';

interface IWatchlistItemProps {
  item: IGetAllSymbolFavoriteResponse;
  index: number;
}

const WatchlistItem = (props: IWatchlistItemProps) => {
  return <SymbolTag2 symbolCode={props.item.code} showChart={true} source={'WatchList'} isWatchList={true} />;
};

export default withMemo(WatchlistItem);

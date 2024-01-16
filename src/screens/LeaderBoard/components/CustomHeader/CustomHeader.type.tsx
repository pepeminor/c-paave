/* eslint-disable @typescript-eslint/no-empty-interface */
import { IContextStateLeaderBoard } from 'screens/LeaderBoard/LeaderBoard.type';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export type IProps = IReduxType;

interface ILogic {
  selectTabLeaderBoard: boolean;
  setIndexState: React.Dispatch<IContextStateLeaderBoard | any>;
}
export type ILogicProps = IProps & ILogic;

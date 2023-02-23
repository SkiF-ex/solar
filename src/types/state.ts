import { ISolar } from './solar';

export interface IRedux {
    data: ISolar[],
    selected: number,
    selectedSolars: ISolar[],
    cartWindowStatus: boolean,
    totalPrice: number,
}


export interface IState {
    redux: IRedux
}
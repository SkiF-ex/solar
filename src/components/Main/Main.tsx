import { useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Main.module.scss';
import { addData } from '../../redux/slice';
import { SolarFrame } from '../SolarFrame';
import { ISolar,IState } from '../../types';

const addSync = (): any => {
    return async (dispatch: Dispatch) => {
        await fetch('https://testtask.twnty.de/').then((data) => data.json()).then(data => dispatch(addData(data)))
    }
}

export const Main = () => {
    const data = useSelector((state: IState) => state.redux.data)
    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(addSync())
    }, [])

    return (
        <section className={styles.root}>
            {data.map((solar: ISolar) =><SolarFrame key={solar.name} solar={solar} />)}
        </section>
    )
}
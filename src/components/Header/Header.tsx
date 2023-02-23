import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import styles from './Header.module.scss';
import { toggleCart } from '../../redux/slice';
import { changeCartCounter } from '../../redux/slice';
import { ISolar, IState } from '../../types';

export const Header = () => {
    const selectedSolars = useSelector((state: IState) => state.redux.selectedSolars)
    const selected = useSelector((state: IState) => state.redux.selected)
    const dispatch = useDispatch();

    const isVisible = selected > 0 ? true : false;
    
    useEffect(() => {
        if (selectedSolars.length) {
            const count = selectedSolars.reduce((total: number, solar: ISolar) => total + (solar.count || 0), 0);
            dispatch(changeCartCounter(count))
        } else {
            dispatch(changeCartCounter(0))
        }
    }, [selectedSolars])

    return (
        <header className={styles.root}>
            <div onClick={() => dispatch(toggleCart())} className={styles.cart}>
                <div className={cn(styles.selected, isVisible ? styles.selectedActive : '')}>
                    {selected}
                </div>
            </div>
        </header>
    )
}
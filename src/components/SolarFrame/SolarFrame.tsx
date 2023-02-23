import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import styles from './SolarFrame.module.scss';
import { ISolar } from '../../types/solar';
import {addSolarToCart, removeSolarFromCart, countOfProducts, toggleSelected } from '../../redux/slice';

export const SolarFrame = ({ solar } : { solar: ISolar }): JSX.Element => {
    const [count, setCount] = useState<number | string>(1);
    const dispatch = useDispatch();

    const isTapped = () => {      
        if (!solar.selected) {
            dispatch(toggleSelected({name: solar.name}));
            dispatch(addSolarToCart(Object.assign({}, solar, {count: count})));
        } else {
            dispatch(removeSolarFromCart({key: 'name', value: solar.name}));
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCount(+event.target.value);
        dispatch(countOfProducts({name: solar.name, count: +event.target.value}));
    }

    return (
        <div className={cn(styles.root, solar.selected ? styles.arrow : '')} key={solar.name}>
            <div onClick={isTapped}>
                <h2 className={styles.name}>Name:</h2>
                <h2 className={styles.name}>{solar.name}</h2>
                <p className={styles.price}>Price: {solar.price}</p>
                <p className={styles.quantity}>Quantity: {solar.quantity}</p>
            </div>
            <div className={cn(styles.management, solar.selected ? styles.managementActive : '')}>
                <input type="number" defaultValue={count} onChange={handleChange} />
            </div>
        </div>
    )
}
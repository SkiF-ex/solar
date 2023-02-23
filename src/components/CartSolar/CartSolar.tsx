import { useDispatch } from 'react-redux';

import { ISolar } from '../../types/solar';
import { countOfProducts, removeSolarFromCart } from '../../redux/slice';
import styles from './CartSolar.module.scss';

export const CartSolar = ({ solar }: {solar: ISolar}) => {
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(countOfProducts({name: solar.name, count: +event.target.value}));
    }

    return (
        <div key={solar.name}  className={styles.root}>
            <div className={styles.frame}>
                <div className={styles.info}>
                    <h3>Name: {solar.name}</h3>
                    <p>Price: {solar.price}</p>
                    <p>Availible in store: {solar.quantity}</p>
                </div>
                <button className={styles.remove} onClick={() => dispatch(removeSolarFromCart({key: 'name', value: solar.name}))}>Remove</button>
            </div>
            <input 
                className={styles.counter} 
                type="number" defaultValue={solar.count} 
                onChange={handleChange}
            />
        </div>
    )
}
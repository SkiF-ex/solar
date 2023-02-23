import { useSelector, useDispatch } from 'react-redux';

import { toggleCart } from '../../redux/slice';
import { CartSolar } from '../CartSolar';
import { ISolar, IState } from '../../types';
import styles from './Cart.module.scss';

export const Cart = () => {
    const cartWindowStatus = useSelector((state: IState) => state.redux.cartWindowStatus);
    const totalPrice = useSelector((state: IState) => state.redux.totalPrice);
    const solars = useSelector((state: IState) => state.redux.selectedSolars);
    const dispatch = useDispatch();
    
    return cartWindowStatus ? (
        <section className={styles.root}>
            <button onClick={() => dispatch(toggleCart())} className={styles.closeButton}>X</button>
            <section className={styles.content}>
                {solars.map((solar: ISolar) => <CartSolar solar={solar} key={solar.name} />)}
            </section>
            <footer className={styles.footer}>
                <button>Buy</button>
                <p>Total cost: {totalPrice}</p>
            </footer>
        </section>
    ) : <></>
}
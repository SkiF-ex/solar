import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { ISolar, IRedux } from '../types';

const initialState: IRedux = {
  data: [],
  selected: 0,
  selectedSolars: [],
  cartWindowStatus: false,
  totalPrice: 0,
};

const slice = createSlice({
    name: 'red',
    initialState: initialState,
    reducers: {
        addData(state, action: PayloadAction<{[key: string]: {quantity: number, price: number}}>) {
            state.data = Object.entries(action.payload).map(([key, value]) => {
                return {
                    name: key,
                    quantity: value.quantity,
                    price: value.price
                };
            });
        },
        addSolarToCart(state, action: PayloadAction<ISolar>) {
            state.selectedSolars.push(action.payload);
        },
        toggleSelected(state, action: PayloadAction<{name: string}>) {
            const foundSolar = state.data.find(obj => obj.name === action.payload.name);
            if (foundSolar) {
              foundSolar.selected = true;
            }
        },
        removeSolarFromCart(state, action: PayloadAction<{key: keyof ISolar, value: string}>) {
            const filteredSolars = state.selectedSolars.filter((obj) => {
                return obj[action.payload.key] !== action.payload.value;
            });

            state.selectedSolars = filteredSolars;
            const foundSolar = state.data.find((obj) => obj.name === action.payload.value);

            if (foundSolar) {
            delete foundSolar.selected;
            }
        },
        changeCartCounter(state, action: PayloadAction<number>) {
            state.selected = action.payload;
            state.totalPrice = state.selectedSolars.reduce((total, solar) => total + (solar.price * (solar.count ?? 1)), 0);
        },
        toggleCart(state) {
            state.cartWindowStatus = !state.cartWindowStatus;
        },
        countOfProducts(state, action: PayloadAction<{name: string, count: number}>) {
            const foundSolar = state.selectedSolars.find((obj) => obj.name === action.payload.name);
            if (foundSolar) {
                foundSolar.count = action.payload.count;
            }
        }
    }
});

export default slice.reducer;
export const { addData, changeCartCounter, toggleCart, addSolarToCart, removeSolarFromCart, countOfProducts, toggleSelected } = slice.actions;
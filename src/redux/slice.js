import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'red',
    initialState: {
        data: [],
        selected: 0,
        selectedSolars: [],
        cartWindowStatus: false,
        totalPrice: 0
    },
    reducers: {
        addData(state, action) {
            state.data = Object.entries(action.payload).map(([key, value]) => {
                return {
                    name: key,
                    quantity: value.quantity,
                    price: value.price
                };
            });
        },
        addSolarToCart(state, action) {
            state.selectedSolars.push(action.payload);
        },
        toggleSelected(state, action) {
            state.data.find(obj => obj.name === action.payload.name).selected = true;
        },
        removeSolarFromCart(state, action) {
            delete state.data.find(obj => obj.name === action.payload.value).selected

            state.selectedSolars = state.selectedSolars.map((obj) => {
                if ((obj)[action.payload.key] !== action.payload.value) {
                    return obj;
                }
            }).filter(obj => {
                return obj != null;
            });
        },
        changeCartCounter(state, action) {
            state.selected = action.payload;
            state.totalPrice = state.selectedSolars.reduce((total, solar) => total + (solar.price * solar.count), 0);
        },
        toggleCart(state) {
            state.cartWindowStatus = !state.cartWindowStatus;
        },
        countOfProducts(state, action) {
            state.selectedSolars.find(obj => obj.name === action.payload.name).count = action.payload.count;
        }
    }
});

export default slice.reducer;
export const { addData, changeCartCounter, toggleCart, addSolarToCart, removeSolarFromCart, countOfProducts, toggleSelected } = slice.actions;
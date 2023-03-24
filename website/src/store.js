import React, {createContext, useReducer} from 'react';

// const initialState = {
//     user: {
//         id: 1,
//         balance: 21000,
//         stocks: [
//             { ticker: "AAPL", quantity: 100 },
//             { ticker: "TSLA", quantity: 100 },
//             { ticker: "GME", quantity: 100 },
//             { ticker: "AA", quantity: 100 },
//             { ticker: "GO", quantity: 100 },
//         ]
//     },
//     stocks: []
// };
const initialState = {
    user: null
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer(async (state, action) => {
        console.log(action)
        switch(action.type) {
            case 'BUY_STOCK':
                let buyStockResponse = fetch('/buyStock', {
                    method: 'POST',
                    data: {
                        ticker: action.payload.ticker,
                        quantity: action.payload.quantity,
                        price: action.payload.price,
                        userId: state.user.id
                    }
                }).then(response => response.json())
                buyStockResponse = {
                    stocks: [
                        { ticker: "AAPL", quantity: 100 },
                        { ticker: "TSLA", quantity: 100 },
                        { ticker: "GME", quantity: 100 },
                        { ticker: "AA", quantity: 100 },
                        { ticker: "GO", quantity: 100 },
                        { ticker: "NVDA", quantity: 100 },
                    ],
                    balance: 22000
                }
                const buyStockState = {
                    ...state, 
                    user: {
                        ...state.user, 
                        stocks: buyStockResponse.stocks, 
                        balance: buyStockResponse.balance
                    }
                };
                return buyStockState;
            case 'SELL_STOCK':
                let sellStockResponse = fetch('/sellStock', {
                    method: 'POST',
                    data: {
                        ticker: action.payload.ticker,
                        quantity: action.payload.quantity,
                        price: action.payload.price,
                        userId: state.user.id
                    }
                }).then(response => response.json())
                sellStockResponse = {
                    stocks: [
                        { ticker: "AAPL", quantity: 100 },
                        { ticker: "TSLA", quantity: 100 },
                        { ticker: "GME", quantity: 100 },
                        { ticker: "AA", quantity: 100 },
                    ],
                    balance: 22000
                }
                const sellStockState = {
                    ...state,
                    user: {
                        ...state.user,
                        stocks: sellStockResponse.stocks,
                        balance: sellStockResponse.balance
                    }
                };
                return sellStockState;
            case 'CREATE_USER':
                fetch('http://localhost:5000/createUser', {
                    // mode: 'no-cors',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({
                        fullname: action.payload.fullname,
                        email: action.payload.email,
                        password: action.payload.password
                    }),
                }).then((response) => {
                    return {
                        ...state,
                        user: response
                    };
                }).catch(error => {
                    return error
                });
            case 'LOGIN_USER':
            case 'NEW_USER':
            default:
                throw new Error("something went wrong");
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
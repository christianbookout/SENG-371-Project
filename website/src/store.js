import React, {createContext, useReducer} from 'react';

const initialState = {
    user: {
        id: 1,
        balance: 21000,
        stocks: [
            { ticker: "AAPL", quantity: 100 },
            { ticker: "TSLA", quantity: 100 },
            { ticker: "GME", quantity: 100 },
            { ticker: "AA", quantity: 100 },
            { ticker: "GO", quantity: 100 },
        ]
    },
    // user: {}
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'BUY_STOCK':
                let buyStockResponse = fetch('/buyStock', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
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
                        headers: {
                            'Content-Type': 'application/json'
                        },
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
                fetch('http://127.0.0.1:5000/createUser', {
                    method: 'POST',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
                        // 'Access-Control-Allow-Methods': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullname: action.payload.name,
                        password: action.payload.password,
                        email: action.payload.email,
                        // balance: 25000
                    })
                }).then(response => {console.log(response); return response.json()}).then(data => {
                    // alert(JSON.stringify(data))
                    const createUserState = {
                        ...state,
                        user: data
                    };
                    return createUserState;
                })
            case 'LOGIN_USER':
            case 'NEW_USER':
            default:
                throw new Error();
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
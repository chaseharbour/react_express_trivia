import React, { createContext, useReducer } from 'react'

export const CTX = createContext();

//Structure of message data from Chat component **If I want rooms, each room would contain array of msg objects**
/* 
    msg {
        author: 'userName',
        message: 'text
    }

    state {
        [{msg}, {msg}, {msg}]
    }
*/

const initState = [
    {author: 'Chad', text: 'Test'},
    {author: 'Joe', text: 'Test'},
    {author: 'Will', text: 'Test'}
]

function reducer(state, action) {
    const { author, text } = action.payload;
    switch(action.type) {
        case 'RECEIVE_MESSAGE': 
            return {
               ...state, {author, text}
            }
        default:
            return state
    }
}

const Store = props => {

    const reducerHook = useReducer(reducer, initState);

    return (
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
}

export default Store

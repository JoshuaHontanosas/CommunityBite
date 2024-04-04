import {createContext, useState, useContext} from 'react'
import * as React from 'react'
import * as Location from 'expo-location';

const globalState = {
    username: "",
    userType: "",
    messages: [],
    getFoodListings: true,  // Change to true later
    foodListingsList: []
};

const GlobalContext = React.createContext(globalState)
const DispatchGlobalContext = React.createContext(undefined)

function GlobalProvider({children}){
    //const [username, setUserName] = useState("");

    const [state, dispatch] = React.useReducer(
        (state, newValue) => ({ ...state, ...newValue }),
        globalState
    );

    return(
        <GlobalContext.Provider value={state}>
            <DispatchGlobalContext.Provider value={dispatch}>
                {children}
            </DispatchGlobalContext.Provider>
        </GlobalContext.Provider>
    );
};

const useGlobalState = () => [
    React.useContext(GlobalContext),
    React.useContext(DispatchGlobalContext)
];

export {GlobalContext, DispatchGlobalContext, GlobalProvider, useGlobalState}
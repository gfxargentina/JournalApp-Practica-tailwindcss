import React from 'react'
import { AppRouter } from './routers/AppRouter'
import { Provider } from 'react-redux'
import { store } from './store/store'

export const JournalApp = () => {
    return (
        //el Provider es un higher order component que contiene 
        //la informacion, en este caso, el store de redux
        <Provider store={ store } >
            <AppRouter />
        </Provider>    
    )
}

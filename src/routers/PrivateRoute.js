import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest

}) => {


    return (
        <Route { ...rest } 
            component={ (props) => (
                //si esta autenticado devuelve el componente journalScreen
                //si no devuelve /login
                ( isAuthenticated ) ? <Component {...props} /> : <Redirect to="/auth/login" />
            )}

        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                //id del usuario que devolvera firebase
                uid: action.payload.uid,
                name: action.payload.displayName
            }

        case types.logout: 
            //restablece a un objeto vacio
            return {}
            
        default: 
            return state;     
    }
}
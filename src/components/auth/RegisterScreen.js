import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    //desestruturamos(sacamos) el msgError del state ui
    const { msgError } = useSelector( state => state.ui )

    //console.log(msgError)


    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const {name, email, password, passwordConfirm} = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        //console.log(name, email, password, passwordConfirm);

        if ( isFormValid() ) {
            //console.log('Formulario Correcto')
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );
        }
    }

    const isFormValid = () => {
        if ( name.trim().length === 0 ) {
            dispatch( setError('El nombre es requerido') )
            return false;
        } else if ( !validator.isEmail(email) ) {
            dispatch( setError('El email no es valido') )
            return false
        } else if ( password !== passwordConfirm || password.length < 5 ) {
            dispatch( setError('La contraseña tiene que tener mas de 5 caracteras y deben ser iguales') )
            return false

        }
        dispatch( removeError() )
        return true
    }



    return (
        <>
            <h3 className="auth__title" >Crear nueva cuenta</h3>
            <form onSubmit={handleRegister}
                  className="animate__animated animate__fadeIn animate__faster"  
            >
                {/* mostrar mensaje de error */}
                {
                    msgError && (
                        <div className="auth__alert-error">
                           { msgError }                    
                        </div>
                    )
                }
            <input 
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="contraseña"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={ handleInputChange }
                    />

                <input 
                    type="password"
                    placeholder="Confirmar contraseña"
                    name="passwordConfirm"
                    className="auth__input"
                    value={passwordConfirm}
                    onChange={ handleInputChange }
                    />    

                <button 
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                     > 
                    Registrar </button>    

                
                
                <Link to="/auth/login" 
                      className="link"   
                >
                    Ya esta registrado?
                </Link>
            </form>

        </>
    )
}

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
            
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-2xl mb-5">Nueva Cuenta</h1>  
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <form onSubmit={handleRegister}
                        className="animate__animated animate__fadeIn animate__faster">
                            {/* mostrar mensaje de error */}
                            {
                                msgError && (
                                    <div className="bg-red-500 text-white rounded-md text-center">
            
                                        <span className="block sm:inline ">{ msgError }</span>                               
                                    </div>
                                                    
                                    
                                )
                            }
                <div className="px-5 py-7">

                    <label className="font-semibold text-sm text-gray-600 pb-1 block">Nombre</label>
                    <input 
                            type="text"
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            placeholder="Nombre"
                            name="name"
                            autoComplete="off"
                            value={name}
                            onChange={ handleInputChange }
                            />
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                    <input type="text" 
                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" 
                        placeholder="Email"
                        name="email"
                        autoComplete="off"
                        value={email}
                        onChange={ handleInputChange }
                        />
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                    <input type="text" 
                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" 
                        placeholder="contraseña"
                        name="password"
                        value={password}
                        onChange={ handleInputChange }
                        />
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">Confirmar Password</label>
                    <input type="text" 
                        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" 
                        placeholder="confirmar contraseña"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={ handleInputChange }
                        />     
                    <button type="submit"  className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                        <span className="inline-block mr-2">Registrar</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
                </form>
                <div className="py-5">
                    <div className="grid grid-cols-2 gap-1">
                    <div className="text-center sm:text-left whitespace-nowrap">
                    <Link to="/auth/login">
                        <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                            <span className="inline-block ml-1">Ya tiene una cuenta?</span>
                        </button>
                        </Link>
                    </div>
                    <div className="text-center sm:text-right  whitespace-nowrap">
                        <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom	">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="inline-block ml-1">Ayuda</span>
                        </button>
                    </div>
                    </div>
                </div>
                </div>    
            </div>
            </div>

        </>
    )
}

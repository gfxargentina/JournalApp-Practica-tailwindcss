import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { startNewNote } from '../../actions/notes'
import { JournalEntries } from './JournalEntries'


export const Sidebar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );

    const handleLogout = () => {
        //console.log("logout")
        dispatch( startLogout() );
    }

    const handleAddNew = () => {
        dispatch( startNewNote() );
    }

    return (
        <aside className="journal__sidebar animate__animated animate__fadeIn animate__faster" >
            <div className="journal__sidebar-navbar" >
                <h3 className="mt-5" >
                    <i className="far fa-moon" ></i>
                    <span>{ name }</span>
                </h3>

                <button className="btn"
                        onClick={ handleLogout }
                >
                    Salir
                </button>
            </div>

            <div className="journal__new-entry mt-5"
                 onClick={ handleAddNew }   
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p>Nueva Entrada</p>

            </div>

            <JournalEntries />


        </aside>
    )
}

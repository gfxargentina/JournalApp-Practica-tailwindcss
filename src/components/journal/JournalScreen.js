import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { MainNothingSelected } from './MainNothingSelected'
import { Sidebar } from './Sidebar'


export const JournalScreen = () => {
    //para traer algo del store/state
    const { active } = useSelector( state => state.notes );

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster" >
            <Sidebar />

            <main  >
                { 
                    //condicional, si la nota tiene algo devuelve noteScreen y si no
                    //tiene nada devuelve MainNothingSelected
                    ( active ) ? (<NoteScreen />) : (<MainNothingSelected />)
                }
                
            </main>
        </div>
    )
}

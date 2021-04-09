import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'


export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector( state => state.notes );
    //console.log(note)
    const  [formValues, handleInputChange, reset ]  = useForm( note );
    //console.log(formValues);

    const { body, title, id, url } = formValues;

    const activeId = useRef( note.id );
    const activeUrl = useRef( note.url );

    useEffect(() => {
    //si el note.id es diferente al activeId.current entonces  
    //se resetea el formulario  
        if ( note.id !== activeId.current ) {
            reset( note );
            //establece un nuevo valor al activeId
            activeId.current = note.id;
        }
        if ( note.url !== activeUrl.current ) {
            reset( note );
            //establece un nuevo valor al activeUrl
            activeUrl.current = note.url;
        }
    }, [note, reset])

    //este efecto sirve para editar la nota, si el titulo/body
    //cambia este efecto lo muestra en el state
    useEffect(() => {
        //console.log(formValues)
        dispatch( activeNote( formValues.id, {...formValues }));
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( startDeleting(id) );
    }

    return (
        <div className="notes__main-content animate__animated animate__fadeIn animate__faster " >
            <NotesAppBar />

            <div className="notes__content " >
                <input 
                    type="text"
                    placeholder="un titulo asombroso"
                    className="notes__title-input"
                    name="title"
                    value={title}
                    onChange={ handleInputChange }
                    />
                <textarea 
                    placeholder="Que paso hoy" 
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                    >
                    </textarea> 

                 {/* si la url de la imagen existe -true - entonces mostrarla
                 si no existe no mostrar nada */}
                  { url &&
                        <div>
                        <img src={ url } 
                            className="notes__image"
                                alt="imagen"
                        />   
                    </div>
                    }        

                    {/* si la url de la imagen existe entonces mostrarla
                 si no existe mostrar msj */}
                 {/* <div >
                    { url ?
                    <img src={ url }
                         className="notes__image"
                         alt="imagen"
                        /> : 'Agregue una imagen' } 
                    </div>  */}
                    
            </div>
        <button 
            className="btn btn-danger"
            onClick={ handleDelete }
        >
            Borrar
            </button>                     
        </div>
    )
}

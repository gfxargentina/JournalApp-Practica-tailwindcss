import React from 'react'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';


// activa dayjs para mostrar las fechas en español
dayjs.locale("es");


export const JournalEntry = ( {id, date, title, body, url} ) => {
    //console.log(id, date, title, body, url);

    const day = dayjs(date);
    const dispatch = useDispatch();

    //para seleccionar la nota activa
    const handleEntryClick = () => {
        dispatch(
            activeNote( id, {
                date, title, body, url
            })
        );
    }

    return (
        <div className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
             onClick={ handleEntryClick }           
        >
            { //si la url de la imagen existe entonces mostrar &&
                url &&
                <div className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${ url })`
                }}
            >
           </div>
            }
            <div className="journal__entry-body" >
                <p className="journal__entry-title" >
                    { title }
                </p>
                <p className="journal__entry-content" >
                    { body } 
                </p>
            </div>

            <div className="journal__entry-date" >
                <span>{day.format('dddd')}</span>
                <h4>{day.format('D')}</h4>
                <h4>{day.format('MMMM')}</h4>

            </div>
            
        </div>
    )
}

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';
import dayjs from 'dayjs';


export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes );

    const day = dayjs(active.date);
    
    const handleSave = () => {
        //console.log(active)
        dispatch( startSaveNote( active ));
    }
    //simula el click en el input para subir el archivo
    const handlePictureClick = () => {
        //console.log('imagen')
        document.querySelector('#fileSelector').click();
    }
    
    //imagen para subir a cloudinary
    const handleFileChange = (e) => {
          //console.log(e.target.files);
          const file = e.target.files[0];
          //si tiene un file entonces disparo una accion con el dispatch
          if ( file ) {
              dispatch( startUploading( file ));
          }
    }

    return (
        <div className="notes__appbar">
            <span>{day.format('DD/MM/YYYY')}</span>

            <input
                id="fileSelector"
                name="file" 
                type="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button className="btn" 
                        onClick={ handlePictureClick }
                >
                    Imagen
                </button>
                <button className="btn"
                    onClick={ handleSave }
                >
                    Guardar
                </button>

            </div>
        </div>
    )
}

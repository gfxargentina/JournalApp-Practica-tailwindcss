import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {
    return async( dispatch, getState ) => {
        //desestructuracion, extraigo uid de auth
        const { uid } = getState().auth;
        //console.log( uid );
        const newNote = { 
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
        //console.log(doc)
        dispatch( activeNote( doc.id, newNote ));
        dispatch( addNewNote( doc.id, newNote ));

    }
}

export const activeNote = ( id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

//agrega una nueva nota
export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) )
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

//guardar la nota
export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
       //si no viene la url de la imagen, entonces borrar la url
       //y no la manda
        if ( !note.url ){
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ));
        Swal.fire('Guardado', note.title, 'success');
    }

}

//actualizar nota si es editada
export const refreshNote = ( id, note) => ({
    type: types.notesUpdate,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
});

//accion para subir una imagen a cloudinary usando un helper
export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
        const { active:activeNote } = getState().notes;
        //console.log(file);
        //console.log(activeNote)

        Swal.fire({
            title: 'Subiendo imagen...',
            text: 'Porfavor espere...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload( file );
        //console.log(fileUrl);

        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ));
        

        Swal.close();
        
    }
}

//borrar una nota

export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();
        dispatch( deleteNote(id) );

    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})

//limpiar el estado al salir de la aplicacion
export const noteLogout = () => ({
    type: types.notesLogoutCleaning,
})
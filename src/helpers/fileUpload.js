export const fileUpload = async( file ) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dgeysldss/upload';

    //el form data que enviamos a cloudinary
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file );

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            //mandamos el body con la info del form
            body: formData
        });

        //si todo sale ok la imagen se sube y cloudinary devuelve la
        //url de la imagen subida secure_url
        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            //si hay algun error de cloudinary lo muestra aqui
            throw await resp.json();
        }
    } catch (err) {
        //muestra un error mas grande de algo que no estamos manejando
        throw err;
    }
}
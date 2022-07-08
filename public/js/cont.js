/* ----------------------- Definiciones ------------------------------ */

const formR = document.getElementById('form-cont');
const fName = document.querySelector('input[name="fname"]');
//const lName = document.querySelector('input[name="lname"]');
const eMail = document.querySelector('input[name="eMail"]');
const phone = document.querySelector('input[name="phone"]');
const textA = document.getElementById('exampleTextarea');

// =================================================================== //

/* ------------ Configuración del Formulario de la Contacto ------------ */
formR.addEventListener('submit', (event2) => {

    event2.preventDefault();

    

    fetch(`http://localhost:3000/contacto?fname=${encodeURIComponent(fName.value)}&eMail=${encodeURIComponent(eMail.value)}&phone=${encodeURIComponent(phone.value)}&exampleTextarea=${encodeURIComponent(textA.value)}`).then((resp) => {

        console.log('enviando info al back')
        resp.json().then((dato) => {

            if (dato.codigo === "50"){
                alert('Hemos recibido sus datos con exito');
            } 

            if (dato.codigo === "60"){
                alert('Introduzca una dirección de correo válida')
            }
            
            console.log(dato.codigo)
            
        });
    });

    formR.reset();

});
// ===================================================================== //
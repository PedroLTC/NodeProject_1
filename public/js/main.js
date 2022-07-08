/* ----------------------- Definiciones ------------------------------ */

const formC = document.getElementById('form-con');
const dateStart = document.querySelector('input[name="dateStart"]');
const dateEnd = document.querySelector('input[name="dateEnd"]');
const Currency = document.querySelector('select[name="currency"]');
const buttonUp = document.getElementById('button-up');

// =================================================================== //



/* -- Funciones para ocultar/mostrar el spinner -- */
function ocultarSpinner() {
    document.getElementById('cont-spinner').style.display = 'none';
};

function mostrarSpinner() {
    document.getElementById('cont-spinner').style.display = 'block';
};
// ============================================== //

ocultarSpinner();

/* ----------- Funcion scrollUp --------------- */
function scrollUp() {

    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;


    if (currentScroll > 0) {
        window.requestAnimationFrame(scrollUp);
        window.scrollTo(0, currentScroll - (currentScroll / 15));
        buttonUp.style.transform = 'scale(0)';
    }
};
// =========================================== //


/* Función para bloquear fechas futuras al día actual (Fecha cierre)*/
function validarE(fecha) {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //Enero es 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    if (fecha <= today) {

        document.getElementById("date-end").value = fecha;

    } else {

        document.getElementById("date-end").value = today;
        alert('La fecha ingresada no puede superar el día de hoy');
    }
}
// =========================================== //



/* -- Función para bloquear fechas futuras al día actual (Fecha inicio) -- */
function validarS(fecha) {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //Enero es 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    if (fecha <= today) {

        document.getElementById("date-start").value = fecha;

    } else {

        document.getElementById("date-start").value = today;
        alert('La fecha ingresada no puede superar el día de hoy');
    }
}
// ======================================================================= //



/* ------------------ Configuración del Boton ir arriba ----------------- */
buttonUp.addEventListener('click', scrollUp);
window.onscroll = () => {

    let scroll = document.documentElement.scrollTop;

    if (scroll > 150) {
        buttonUp.style.transform = 'scale(1)';
    } else {
        buttonUp.style.transform = 'scale(0)';
    }
}
// ===================================================================== //

/* ------------ Configuración del Formulario de la Consulta ------------ */
formC.addEventListener('submit', (event) => {

    event.preventDefault();

    mostrarSpinner();

    window.scrollTo(0, 1300);

    document.getElementById('myChart').remove();
    const canvas = document.createElement('canvas');
    canvas.id = 'myChart';

    let contCanvas = document.getElementById('cont-canvas');
    contCanvas.appendChild(canvas);


    const myChart = document.getElementById('myChart').getContext('2d');


    fetch(`http://localhost:3000/cotizacion?currency=${encodeURIComponent(Currency.value)}&dateStart=${encodeURIComponent(dateStart.value)}&dateEnd=${encodeURIComponent(dateEnd.value)}`).then((response) => {

        response.json().then((data) => {

            if (Object.keys(data[0]).length == 3) {

                let ejeX = data[0].timestamps.map(x => x.slice(0, -10)); // "2020-12-30T00:00:00Z" to "2020-12-30"
                let ejeY = data[0].prices.map(y => Number.parseFloat(y).toFixed(2)); // string "1234.56789" to  float 1234.56 
                let Title = data[0].currency
                console.log(`El Back retorno bien la data al Front`)
                ocultarSpinner(); // Oculta el spinner


                /* Configuración del Gráfico */
                let chart = new Chart(myChart, {
                    type: 'line',
                    data: {
                        labels: ejeX,
                        datasets: [{
                            label: `${Title}`,
                            data: ejeY,
                            fill: true,
                            borderColor: [
                                /*'rgb(44,62,80)'*/
                                /*'rgb(255,0,0)'*/
                                'rgb(24,188,156)'
                            ],
                        }]
                    },
                    options: {

                        responsive: true,
                        title: {
                            display: true,
                            text: 'Evolución del Precio'
                        },

                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },

                        hover: {
                            mode: 'nearest',
                            intersect: true,
                        },

                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'FECHA'
                                }
                            }],

                            yAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'USD'
                                },
                                ticks: {
                                    beginAtZero: false,
                                },
                            }],
                        }


                    }

                })
                window.scrollTo(0, 9999);
                //========================== */

            } else {
                alert('Ingrese una fecha válida');
                ocultarSpinner();
            }

        })
    });
    formC.reset();
});
// ===================================================================== //

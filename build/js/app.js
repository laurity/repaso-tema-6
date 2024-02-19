document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    
    navegacionFija();

    crearGaleria();

    scrollNav();

     // Obtener el elemento span por su ID
     let yearSpan = document.getElementById("year");

     // Obtener el año actual
     let currentYear = new Date().getFullYear();
 
     // Establecer el año actual en el contenido del span
     yearSpan.textContent = currentYear;
}

/** Función para implementar una barra de navegación fija en una página web, que se congela cuando el/la usuario/a hace scroll hacia abajo y alcanza una sección específica del documento **/ 

function navegacionFija() {
    const barra = document.querySelector('.header');
    const video = document.querySelector('.video');
    const body = document.querySelector('body');


    window.addEventListener('scroll', function() {
        // Si el usuario ha  hecho scroll hacia abajo lo suficiente como para
        // llegar a la sección "galeria"
        if( video.getBoundingClientRect().bottom < 0 && this.window.innerWidth >= 768 ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

/** Función para mejorar la experiencia de desplazamiento en una página web al hacer clic en los enlaces de navegación **/ 

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    // Un evento click para cada enlace

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            
            // Le quitamos el comportamiento predeterminado al enlace
            e.preventDefault();

            // Se obtiene el valor del atributo href del enlace en el que se hizo clic. 
            const seccionScroll = e.target.attributes.href.value;
            // Selección de la sección de destino
            const seccion = document.querySelector(seccionScroll);
            // Desplazamiento suave hacia la sección
            seccion.scrollIntoView({ behavior: "smooth"});
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++ ) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.jpeg" type="image/jpeg">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}  

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.jpeg" type="image/jpeg">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    // Crea el Overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    // Boton para cerrar el Modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    // Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}
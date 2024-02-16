document.addEventListener('DOMContentLoaded', function(){
    iniciarApp()
})

function iniciarApp() {
    crearGaleria()

    let yearSpan = document.getElementById('year')

    let currentYear = new Date().getFullYear()

    yearSpan.textContent = currentYear  
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes')

    for (let i = 1; i <=12; i++){
        const imagen = document.createElement('picture')
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.jpeg" type="image/jpeg">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" witdh="200" height="300" src="build/img/thumb/${i}.jpg">
        `
    }
}

function mostrarImagen(){

}
document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
    fijarNavegacion();
    resaltarEnlace();
    scrollNavegacion();
});

function fijarNavegacion() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    document.addEventListener('scroll', function() {
        //De esta forma vemos en que coordenadas está el scroll en base a la parte de sobreFestival, cuando esas coordenadas
        //sean menores a 1 quiere decir que ya se paso el elemento, cuando esto pasa tenemos que agregar la barra de navegacion.
        if(sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        } else{
            header.classList.remove('fixed');
        }
});
}

function crearGaleria(){
    const cantidadImagenes = 16;
    const galeria = document.querySelector('.galeria-imagenes')

    for (let i = 1; i <= cantidadImagenes; i++) {
        const imagen = document.createElement('IMG');
        imagen.loading = 'lazy';
        imagen.src = `src/img/gallery/thumb/${i}.jpg`;
        imagen.alt = 'imagen galeria';
        
        //Tenemos que detectar cual imagen se esta seleccionando
        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) {
    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = 'imagen galeria';

    //Generar modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = function(){
        cerrarModal();
    }
    //modal.onclick = cerrarModal; es lo mismo que la funcion de arriba ya que no tiene parametros la funcion.

    //Boton para cerrar el modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = function(){
        cerrarModal();
    }
    //cerrarModalBtn.onclick = cerrarModal; es lo mismo que la funcion de arriba ya que no tiene parametros la funcion.

    //Le doy un border radius al boton. Aunque es mejor hacerlo con la clase en el sass
    //cerrarModalBtn.style.borderRadius = '40%';
    //cerrarModalBtn.style.border.radius = '100%';



    modal.appendChild(cerrarModalBtn);
    //Si quiero que el boton aparezca abajo de la imagen primero debo agregar la imagen y luego el boton
    modal.appendChild(imagen);
    
    


    //Agregar al HTML
    const body = document.querySelector('body');
    //Agrego la siguiente clase para que el body no se pueda hacer scroll cuando se abra el modal, se implementa en globales
    body.classList.add('overflow-hidden')
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('cerrarModal'); //Agregamos una clase para la animacion de salida

    //El siguiente SetTimeout es para que se vea la animacion de salida, ya que si se elimina directamente no se ve
    //porque se elimina de inmediato, este SetTimeout nos da 0,5 segundos antes de eliminar el modal
    setTimeout(() => {
        if(modal){
            modal.remove();
        }
        //modal?.remove(); es lo mismo que el if de arriba
    }, 500);
    
    
}


function resaltarEnlace() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        sections.forEach( section => {
            //offsetTop nos da la distancia de la parte superior de la pagina hasta el elemento
            const sectionTop = section.offsetTop
            //ClientHeight nos da la altura del elemento
            const sectionHeight = section.clientHeight
            //El siguiente if es para saber si el scroll esta en la parte superior de la pagina, si es asi el offsetTop es 0
            //cuando el scroll es mayor a la parte superior de la seccion menos la mitad de la altura de la seccion
            //es porque el scroll esta en la seccion actual
            if(window.scrollY >= (sectionTop - sectionHeight / 3 ) ) {
                actual = section.id
            }
        })
        //El siguiente forEach es para resaltar el enlace que corresponde a la seccion actual
        navLinks.forEach(link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNavegacion(){
    const navLinks = document.querySelectorAll('.navegacion-principal a');

    navLinks.forEach(link => {
        link.addEventListener('click', e =>{
            e.preventDefault();
            //lo que hace la siguiente linea, es tomar el href del enlace y buscar el elemento que tenga ese id
            const sectionScroll = e.target.getAttribute('href');
            //El siguiente querySelector es para seleccionar el elemento que tenga el id que se obtuvo en la linea anterior
            const section = document.querySelector(sectionScroll);
            
            //Esto hace que el scroll sea suave
            section.scrollIntoView({behavior: 'smooth'});
        });
    });
}
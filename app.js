
let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");


btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener('click', () => {
    if(pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});


// Esta funcion va a conectarse a la API, va obtener las peliculas y las va cargar /////dentro del contenedor y dentro del codigo HTML
const cargarPeliculas = async() => {

    try {

        // Esta funcion nos permite poner una cadena de texto, que sera la direccion URL ///a donde nosotros haremos la peticion.
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e259101740c3869773bb0b7e389f2550&page=${pagina}`);
    
    
        console.log(respuesta);

        // Si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            
            console.log(datos.results);

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>;
                    </div>`
            });

            document.getElementById('contenedor').innerHTML = peliculas;

        } else if (respuesta.status === 401) {
            console.log("Pusiste la llave mal");
        } else if (respuesta.status === 404) {
            console.log("La pelicula que buscas no existe");
        } else {
            console.log("Ocurrio un error inesperado");
        }   
        

    } catch (error) {
        console.log(error);
    }

    
}

// siempre que usemos async await, debemos usar try catch

// await = realizar una peticion a un servidor lleva tiempo, el metodo await nos permite esperar la respuesta de la peticion
// await = solo puede user usado dentro de funciones asincronas (async)


cargarPeliculas();
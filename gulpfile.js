import {src, dest, watch, series} from 'gulp' //src nos dice de donde vamos a tomar los archivos y dest nos dice a donde vamos a guardar los archivos
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);


export function css(done) {
    src('src/scss/app.scss', {sourcemaps:true}) //Utilizamos la funcion src que importamos arriba y 
    //le pasamos la ruta de donde se encuentra nuestro archivo scss incluido el archivo que queremos compilar
        .pipe(sass().on('error', sass.logError)) //llamamos a la funcion sass
        .pipe(dest('build/css', {sourcemaps: true})); //por ultimo llamamos a la funcion dest y le pasamos la ruta donde queremos guardar el archivo css
        //Lo anterior es lo mismo que "sass": "sass --watch src/scss:build/css", en el package.json
    done();
}

export function js(done){
    src('src/js/app.js')
        .pipe(dest('build/js'));
    done();
}

export function dev() {
    watch('src/scss/**/*.scss', css); 
    //Con la funcion watch le decimos a gulp que archivo debe ejecutar y que funcion queremos que se ejecute (la funcion css en este caso)
    watch('src/js/**/*.js', js); //Tambien debemos crear un watch para js para que se ejecuten los cambios en el momento
}

export default series(css, js, dev); //Con la funcion default le decimos a gulp que funciones queremos que se ejecuten en serie
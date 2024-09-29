// Seleccionar elementos del DOM
const courseList = document.getElementById('courses-list');  // Lista donde se mostrarán los cursos
const addCourseForm = document.getElementById('add-course-form');  // Formulario para agregar un nuevo curso

/**
 * Función para cargar cursos desde localStorage.
 * Si no hay cursos, se carga un arreglo vacío.
 */
function loadCourses() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];   // Obtener los cursos desde localStorage o un arreglo vacío
    courseList.innerHTML = ''; // Limpiar la lista de cursos antes de cargar los nuevos
    courses.forEach(course => displayCourse(course));  // Mostrar cada curso en la lista
}

/**
 * Función para actualizar la lista de cursos dinámicamente sin necesidad de recargar la página.
 * Llama a la función loadCourses para refrescar la lista.
 */
function updateCoursesList() {
    loadCourses(); // Recargar la lista de cursos
}

/**
 * Función para mostrar un curso en la lista de manera dinámica.
 * Crea un nuevo elemento con la información del curso y lo agrega a la lista.
 * @param {Object} course - El objeto del curso que contiene la información a mostrar.
 */
function displayCourse(course) {
    // Crear la tarjeta del curso
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');  // Agregar clase para el estilo CSS
    
    // Agregar contenido a la tarjeta
    courseCard.innerHTML = `
        <h3>${course.name}</h3>  <!-- Nombre del curso -->
        <p><strong>Instructor:</strong> ${course.instructor}</p>  <!-- Nombre del instructor -->
        <p><strong>Inicio:</strong> ${course.startDate}</p>  <!-- Fecha de inicio -->
        <p><strong>Duración:</strong> ${course.duration} horas</p>  <!-- Duración del curso -->
        <button class="btn">Ver más detalles</button>  <!-- Botón para ver más detalles -->
        <div class="course-details" style="display:none;">
            <p><strong>Descripción:</strong> ${course.description}</p>  <!-- Descripción del curso -->
        </div>
    `;

    // Agregar evento al botón para mostrar/ocultar los detalles del curso
    const detailsButton = courseCard.querySelector('.btn');
    detailsButton.addEventListener('click', () => {
        const details = courseCard.querySelector('.course-details');
        // Alternar la visibilidad de los detalles del curso
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    });

    // Agregar la tarjeta de curso a la lista
    courseList.appendChild(courseCard);
}

// Cargar los cursos al iniciar
loadCourses();
// Seleccionar elementos del DOM
const courseList = document.getElementById('courses-list');
const addCourseForm = document.getElementById('add-course-form');

// Función para cargar cursos desde localStorage
function loadCourses() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];    
    courses.forEach(course => displayCourse(course));
    //localStorage.removeItem('courses');//Borrar los cursos que esten guardados
}

// Función para mostrar un curso en la lista
function displayCourse(course) {
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');
    courseCard.innerHTML = `
        <h3>${course.name}</h3>
        <p><strong>Instructor:</strong> ${course.instructor}</p>
        <p><strong>Inicio:</strong> ${course.startDate}</p>
        <p><strong>Duración:</strong> ${course.duration} horas</p>
        <button class="btn">Ver más detalles</button>
        <div class="course-details" style="display:none;">
            <p><strong>Descripción:</strong> ${course.description}</p>
        </div>
    `;

    // Agregar evento al botón de detalles
    const detailsButton = courseCard.querySelector('.btn');
    detailsButton.addEventListener('click', () => {
        const details = courseCard.querySelector('.course-details');
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    });

    // Agregar la tarjeta de curso a la lista    
    courseList.appendChild(courseCard);
}

// Cargar los cursos al iniciar
loadCourses();
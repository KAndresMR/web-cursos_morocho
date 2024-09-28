// Seleccionar elementos del DOM
const addCourseForm = document.getElementById('add-course-form');
const courseNameInput = document.getElementById('course-name');
const instructorInput = document.getElementById('instructor-name');
const startDateInput = document.getElementById('start-date');
const durationInput = document.getElementById('duration');
const descriptionInput = document.getElementById('description');

// Función para validar el formato de los campos
function validateFields(course) {
    // Validar que todos los campos estén llenos
    if (Object.values(course).some(field => !field)) {
        alert('Por favor, completa todos los campos.');
        return false;
    }

    // Validar que la duración sea un número positivo
    if (isNaN(course.duration) || course.duration <= 0) {
        alert('La duración debe ser un número positivo.');
        return false;
    }

    // Validar que la fecha no sea en el pasado
    const currentDate = new Date();
    const startDate = new Date(course.startDate);
    if (startDate < currentDate) {
        alert('La fecha de inicio no puede ser en el pasado.');
        return false;
    }

    return true;
}

// Función para agregar un nuevo curso
function addCourse(event) {
    event.preventDefault();

    // Crear un objeto curso
    const newCourse = {
        name: courseNameInput.value,
        instructor: instructorInput.value,
        startDate: startDateInput.value,
        duration: durationInput.value,
        description: descriptionInput.value,  
    };

    // Validar campos
    if (!validateFields(newCourse)) {
        return; // Detener si la validación falla
    }

    // Guardar en localStorage
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(courses));

    // Limpiar el formulario
    addCourseForm.reset();

    // Mensaje de éxito
    alert('Curso agregado exitosamente.');
}

// Event listener para el formulario
addCourseForm.addEventListener('submit', addCourse);

// Seleccionar todos los inputs y agregar un event listener
const inputs = document.querySelectorAll('input, textarea, select');

inputs.forEach(input => {
    input.addEventListener('keydown', () => {
        // Añadir la clase de temblor al escribir
        input.classList.add('shake');
    });

    input.addEventListener('animationend', () => {
        // Quitar la clase de temblor una vez que la animación termine
        input.classList.remove('shake');
    });
});
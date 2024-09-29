// Seleccionar elementos del DOM
const addCourseForm = document.getElementById('add-course-form');  // Formulario para agregar un nuevo curso
const courseNameInput = document.getElementById('course-name');  // Input para el nombre del curso
const instructorInput = document.getElementById('instructor-name');  // Input para el nombre del instructor
const startDateInput = document.getElementById('start-date');  // Input para la fecha de inicio del curso
const durationInput = document.getElementById('duration');  // Input para la duración del curso
const descriptionInput = document.getElementById('description');  // Input para la descripción del curso

/**
 * Función para validar el formato de los campos del curso.
 * @param {Object} course - Objeto que representa el curso con sus propiedades.
 * @returns {boolean} - Retorna true si los campos son válidos, de lo contrario false.
 */
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

    // Validar que la fecha de inicio no sea en el pasado
    const currentDate = new Date();  // Obtener la fecha actual
    const startDate = new Date(course.startDate);  // Convertir la fecha de inicio del curso
    if (startDate < currentDate) {
        alert('La fecha de inicio no puede ser en el pasado.');
        return false;
    }

    return true;  // Si todas las validaciones pasan, retornar true
}

/**
 * Función para agregar un nuevo curso.
 * @param {Event} event - Evento de la acción de enviar el formulario.
 */
function addCourse(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario (recarga de la página)

    // Crear un objeto curso con los valores de los campos del formulario
    const newCourse = {
        name: courseNameInput.value,
        instructor: instructorInput.value,
        startDate: startDateInput.value,
        duration: durationInput.value,
        description: descriptionInput.value,
    };

    // Validar los campos del curso
    if (!validateFields(newCourse)) {
        return;  // Detener la ejecución si la validación falla
    }

    // Obtener los cursos actuales de localStorage y agregar el nuevo curso
    const courses = JSON.parse(localStorage.getItem('courses')) || [];  // Obtener cursos de localStorage (si existen)
    courses.push(newCourse);  // Agregar el nuevo curso a la lista
    localStorage.setItem('courses', JSON.stringify(courses));  // Guardar la lista actualizada de cursos en localStorage

    // Limpiar el formulario
    addCourseForm.reset();

    // Mostrar mensaje de éxito
    alert('Curso agregado exitosamente.');

    // Actualizar la lista de cursos sin recargar la página
    updateCoursesList();
}

// Event listener para el formulario de agregar curso
addCourseForm.addEventListener('submit', addCourse);

/**
 * Función para agregar un efecto de "temblor" a los campos de entrada.
 * El temblor ocurre cuando se escribe en cualquier campo.
 */
const inputs = document.querySelectorAll('input, textarea, select');  // Seleccionar todos los inputs, textareas y selects

// Agregar eventos a los inputs
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
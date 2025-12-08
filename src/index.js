// Punto de entrada principal de la aplicación
console.log('¡Bienvenido a Feria del Libro!');

// Función principal
function main() {
    console.log('Iniciando aplicación...');
    // Aquí iría la lógica principal de la aplicación
}

// Ejecutar si es el módulo principal
if (require.main === module) {
    main();
}

module.exports = { main };
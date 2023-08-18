let productosArray = [];

async function cargarProductos() {
    try {
        let respuesta = await fetch('./js/productos.json');  // Ajusta la ruta si es necesario
        if (!respuesta.ok) {
            throw new Error('Error al obtener el archivo JSON');
        }
        let productosJSON = await respuesta.json();

        productosJSON.forEach(p => {
            productosArray.push(new Producto(p.id, p.nombre, p.categoria, p.precio, p.imagen1, p.imagen2, p.descripcion));
        });
        
        displayProductosItems(productosArray);
        addListeners();

    } catch (error) {
        console.error('Hubo un problema con la petición fetch:', error.message);
    }
}

cargarProductos();

let productosArray = [];
let categoriasArray = [];

async function cargarProductos() {
    try {
        let respuesta = await fetch('./js/productos.json');  
        if (!respuesta.ok) {
            throw new Error('Error al obtener el archivo JSON');
        }
        let productosJSON = await respuesta.json();

        productosJSON.forEach(p => {
            productosArray.push(new Producto(p.id, p.nombre, p.categoria, p.precio, p.imagen1, p.imagen2, p.descripcion));
        });

        productosArray.forEach(producto => {
            // Buscamos si la categoría del producto existe en el array de categorías
            let categoriaExistente = categoriasArray.find(categoria => categoria.nombre == producto.categoria);

            if (categoriaExistente) {
                // Si la categoria existe, incrementamos su atributo de cantidad
                categoriaExistente.cantidad++;
            } else {
                // Si la categoria no existe, creamos un objeto con su nombre, le asigamos 1 y la agregamos al arrayCategorias
                let nuevaCategoria = new Categoria(producto.categoria, 1);
                categoriasArray.push(nuevaCategoria);
            }
        });

        displayProductosItems(productosArray);
        displayCategoriasItems(categoriasArray);
        addListeners();

    } catch (error) {
        console.error('Hubo un problema con la petición fetch:', error.message);
    }
}

cargarProductos();

/*
Funcion para ver las categorias existentes y la cantidad de productos en la misma.

Recorremos el array de productos, si encontramos una nueva categoria creamos un objeto de la clase Categoria, donde iremos sumando la cantidad de productos.
*/
/*
let categoriasArray = [];
console.log(productosArray)
console.log(productosArray.length);

productosArray.forEach(producto => {
     console.log('hola');
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
*/
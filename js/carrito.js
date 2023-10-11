let productosEnCarrito = localStorage.getItem("productos-en-carrito")
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.getElementById("carrito-vacio")
const contenedorCarritoProductos = document.getElementById("carrito-productos")
const contenedorCarritoAcciones = document.getElementById("carrito-acciones")
const contenedorCarritoComprado = document.getElementById("carrito-comprado")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.getElementById("carrito-acciones-vaciar")
const contenedorTotal = document.getElementById("total")
const botonComprar = document.getElementById("carrito-acciones-comprar")


//  productos pasados  de HTMl a JS

function cargarProductosCarrito(){
if (productosEnCarrito && productosEnCarrito.length > 0){

    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.remove("disabled")
    contenedorCarritoAcciones.classList.remove("disabled")
    contenedorCarritoComprado.classList.add("disabled")
    
    contenedorCarritoProductos.innerHTML = ""
    
   
productosEnCarrito.forEach(producto=>{
// creamos el div del producto
    const div = document.createElement("div")
    div.classList.add("carrito-producto")
    div.innerHTML = `
    <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
    <div class="carrito-producto-titulo">
        <small>Titulo</small>
        <h3>${producto.titulo}</h3>
    </div>
    <div class="carrito-producto-cantidad">
        <small>Cantidad</small>
        <p>${producto.cantidad}</p>
    </div>
    <div class="carrito-producto-precio">
        <small>precio</small>
        <p>$${producto.precio}</p>
    </div>
    <div class="carrito-producto-subtotal">
        <small>Subtotal</small>
        <p>${producto.precio * producto.cantidad}</p>
    </div>
    <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
</div>
    `
    contenedorCarritoProductos.appendChild(div)
})

actualizarBotonesEliminar()
actualizarTotal()

} else {
    contenedorCarritoVacio.classList.remove("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.add("disabled")
}


}

cargarProductosCarrito()

function actualizarBotonesEliminar(){
    botonesEliminar= document.querySelectorAll(".carrito-producto-eliminar")

    botonesEliminar.forEach (boton =>{
        boton.addEventListener("click", eliminarDelCarrito)
    })

}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoEnCarrito = productosEnCarrito.find(producto => producto.id === idBoton);

    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad > 1) {
            // Reducir la cantidad del producto en 1
            productoEnCarrito.cantidad--;
        } else {
            // Eliminar el producto si la cantidad es 1
            const index = productosEnCarrito.indexOf(productoEnCarrito);
            if (index !== -1) {
                productosEnCarrito.splice(index, 1);
            }
        }

        cargarProductosCarrito() //visualizacion del carrito

        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }
}

// Vaciar el carrito de compras con un click

botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito(){

    productosEnCarrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    cargarProductosCarrito()
}

// calcular el total de las compras
function actualizarTotal(){
    const totalCalculado =  productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad),0)
    contenedorTotal.innerText = `$${totalCalculado}`

}

botonComprar.addEventListener("click", comprarCarrito)

// Vaciar el carrito de compras con un click

function comprarCarrito(){
    productosEnCarrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")
}


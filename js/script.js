
const productos = [
    {
        id: "casaca-01",
        titulo: "Casaca 01",
        imagen: "../img/casaca.jpg",
        categoria: {
            nombre:"Casaca",
            id:"casaca"
        },
        precio: 50
    },
    {
        id: "casaca-02",
        titulo: "Casaca 02",
        imagen: "../img/casaca.jpg",
        categoria: {
            nombre:"Casaca",
            id:"casaca"
        },
        precio: 50
    },
    {
        id: "casaca-03",
        titulo: "Casaca 03",
        imagen: "../img/casaca.jpg",
        categoria: {
            nombre:"Casaca",
            id:"casaca"
        },
        precio: 50
    },
    {
        id: "casaca-04",
        titulo: "Casaca 04",
        imagen: "../img/casaca.jpg",
        categoria: {
            nombre:"Casaca",
            id:"casaca"
        },
        precio: 50
    },
    {
        id: "pantalon-01",
        titulo: "Pantalon 01",
        imagen: "../img/pantalon.jpg",
        categoria: {
            nombre:"Pantalon",
            id:"pantalon"
        },
        precio: 50
    },
    {
        id: "pantalon-02",
        titulo: "Pantalon 02",
        imagen: "../img/pantalon.jpg",
        categoria: {
            nombre:"Pantalon",
            id:"pantalon"
        },
        precio: 50
    },
    {
        id: "pantalon-03",
        titulo: "Pantalon 03",
        imagen: "../img/pantalon.jpg",
        categoria: {
            nombre:"Pantalon",
            id:"pantalon"
        },
        precio: 50
    },
    {
        id: "pantalon-04",
        titulo: "Pantalon 04",
        imagen: "../img/pantalon.jpg",
        categoria: {
            nombre:"Pantalon",
            id:"pantalon"
        },
        precio: 50
    },
    {
        id: "camisa-01",
        titulo: "Camisa 01",
        imagen: "../img/camisa.jpg",
        categoria: {
            nombre:"Camisa",
            id:"camisa"
        },
        precio: 50
    },
    {
        id: "camisa-02",
        titulo: "Camisa 02",
        imagen: "../img/camisa.jpg",
        categoria: {
            nombre:"Camisa",
            id:"camisa"
        },
        precio: 50
    },
    {
        id: "camisa-03",
        titulo: "Camisa 03",
        imagen: "../img/camisa.jpg",
        categoria: {
            nombre:"Camisa",
            id:"camisa"
        },
        precio: 50
    },
    {
        id: "camisa-04",
        titulo: "Camisa 04",
        imagen: "../img/camisa.jpg",
        categoria: {
            nombre:"Camisa",
            id:"camisa"
        },
        precio: 50
    },
    {
        id: "zapatilla-01",
        titulo: "Zapatilla 01",
        imagen: "../img/Zapatilla.jpg",
        categoria: {
            nombre:"Zapatilla",
            id:"zapatilla"
        },
        precio: 50
    },
    {
        id: "zapatilla-02",
        titulo: "Zapatilla 02",
        imagen: "../img/Zapatilla.jpg",
        categoria: {
            nombre:"Zapatilla",
            id:"zapatilla"
        },
        precio: 50
    },
    {
        id: "zapatilla-03",
        titulo: "Zapatilla 04",
        imagen: "../img/Zapatilla.jpg",
        categoria: {
            nombre:"Zapatilla",
            id:"zapatilla"
        },
        precio: 50
    },
    {
        id: "zapatilla-04",
        titulo: "Zapatilla 04",
        imagen: "../img/Zapatilla.jpg",
        categoria: {
            nombre:"Zapatilla",
            id:"zapatilla"
        },
        precio: 50
    },
]

// pasar los productos de HTML a JS
const contenedorProductos = document.getElementById("contenedor-productos")
const botonesCategorias = document.querySelectorAll(".boton-categoria")
const tituloPrincipal = document.getElementById("titulo-principal")
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numero = document.getElementById("numero")


function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = '' // Limpia el contenedor antes de cargar nuevos productos

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto")
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `
        contenedorProductos.appendChild(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos)

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => { 

        botonesCategorias.forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active")
        
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton)
        } else {
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(productos)
        }
    })
})

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar")

    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito)
    })

}

// Si hay productos en el carrito, no lo retorna a cero;sino, sigue con su msima cantidad
let productosEnCarrito;

const productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS)
    actualizarNumero()
} else {
    productosEnCarrito = []
}


function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find (producto => producto.id === idBoton)

    if(productosEnCarrito.some(producto=>producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito [index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado)
    }
     
    actualizarNumero()
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

}
function actualizarNumero(){
    let nuevoNumero = productosEnCarrito.reduce ((acc, producto) => acc + producto.cantidad, 0)
    numero.innerText = nuevoNumero

}

    


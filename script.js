const materias = [
    {
        id: "1",
        nombre: "Introducción a la Ingeniería Química",
        anio: 1,
        cuatrimestre: 1,
        regular: [],
        aprobada: []
    },
    {
        id: "2",
        nombre: "Ingeniería y Sociedad",
        anio: 1,
        cuatrimestre: 1,
        regular: [],
        aprobada: []
    },
    {
        id: "3",
        nombre: "Álgebra y Geometría Analítica",
        anio: 1,
        cuatrimestre: 1,
        regular: [],
        aprobada: []
    },
    {
        id: "4",
        nombre: "Análisis Matemático I",
        anio: 1,
        cuatrimestre: 1,
        regular: [],
        aprobada: []
    },
    {
        id: "6",
        nombre: "Química",
        anio: 1,
        cuatrimestre: 2,
        regular: [],
        aprobada: []
    },
    {
        id: "12",
        nombre: "Análisis Matemático II",
        anio: 1,
        cuatrimestre: 2,
        regular: ["3", "4"],
        aprobada: []
    }
];

function crearMalla() {
    const container = document.getElementById("malla");
    container.innerHTML = "";
    materias.forEach(m => {
        const estado = localStorage.getItem("estado_" + m.id) || "pendiente";
        const bloqueada = !puedeCursar(m);
        const div = document.createElement("div");
        div.className = "materia " + (bloqueada ? "bloqueada" : estado);
        div.textContent = m.nombre;
        div.onclick = () => cambiarEstado(m, div);
        container.appendChild(div);
    });
}

function puedeCursar(materia) {
    return materia.regular.every(id => {
        const estado = localStorage.getItem("estado_" + id);
        return estado === "cursada" || estado === "aprobada";
    }) && materia.aprobada.every(id => {
        const estado = localStorage.getItem("estado_" + id);
        return estado === "aprobada";
    });
}

function cambiarEstado(materia, div) {
    let estado = localStorage.getItem("estado_" + materia.id) || "pendiente";
    estado = estado === "pendiente" ? "cursada" : estado === "cursada" ? "aprobada" : "pendiente";
    localStorage.setItem("estado_" + materia.id, estado);
    crearMalla(); // refrescar
}

function resetEstados() {
    materias.forEach(m => localStorage.removeItem("estado_" + m.id));
    crearMalla();
}

window.onload = crearMalla;

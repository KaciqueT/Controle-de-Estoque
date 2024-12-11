const servidor = sessionStorage.getItem("servidor_nodered")

const verificarToken = () => {
    const token = sessionStorage.getItem("token")
    const endpoint = `${servidor}/verificarToken/${token}`
    fetch(endpoint)
    .then(res => res.json())
    .then(res =>{
        if(res.retorno == 200){ //OK
            pagina()
        }else{ // Invalidado
            alert("Token Invalido")
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("id_token")
            sessionStorage.removeItem("id")
            sessionStorage.removeItem("nome")
            window.location.href="../index.html"
        }
    })
}
verificarToken()

const btnMenuPrincipal = document.querySelector("#btnMenuPrincipal")
const menuPrincipal = document.querySelector("#menuPrincipal")
const btnMenuItem = [...document.querySelectorAll(".btnMenuItem")]
const Topoid = document.querySelector("#id")
const Toponome = document.querySelector("#nome")
const btnLogoff = document.querySelector("#btnLogoff")

const pagina = () => {
    if(sessionStorage.getItem("id") == "-1"){
        window.location.href = "./index.html"
    }
    
    btnMenuPrincipal.addEventListener("click", (evt) => {
        menuPrincipal.classList.toggle("ocultar")
    })
    
    btnMenuItem.forEach(e => {
        e.addEventListener("click", (evt) =>{
            menuPrincipal.classList.add("ocultar")
        })
    })
    
    btnLogoff.addEventListener("click", (evt) => {
        sessionStorage.setItem("id", "-1")
        sessionStorage.setItem("nome", "-1")
        window.location.href = "./index.html"
    })
    
    const idPessoa = sessionStorage.getItem("id")
    const nomePessoa = sessionStorage.getItem("nome")
    Topoid.innerHTML = `ID : ${idPessoa}`
    Toponome.innerHTML = `${nomePessoa}`
}

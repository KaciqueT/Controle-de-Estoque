import {Cxmsg} from "/Utilitarios/cxmsg.js"

const f_email = document.querySelector("#f_email")
const f_emailcadastro = document.querySelector("#f_emailcadastro")
const f_senha1 = document.querySelector("#f_senha1")
const f_senha2 = document.querySelector("#f_senha2")
const f_senha = document.querySelector("#f_senha")
const btnLogin = document.querySelector("#btnLogin")
const primeiroAcesso = document.querySelector("#primeiroAcesso")
const btnFecharSenha = document.querySelector("#btnFecharSenha")
const btnGravarSenha = document.querySelector("#btnGravarSenha")
const iddefsenha = document.querySelector("#iddefsenha")
// const login = document.querySelector("#login")

sessionStorage.setItem("id", "-1")
sessionStorage.setItem("nome", "-1")

let servidor = null

const endpoint_config = `/config.txt`
fetch(endpoint_config)
.then(res => res.json())
.then(res =>{
    sessionStorage.setItem("servidor_nodered", res.servidor_nodered)
    sessionStorage.setItem("versao", res.versao)
    servidor = res.servidor_nodered
})

btnFecharSenha.addEventListener("click", (evt) => {
    primeiroAcesso.classList.add("ocultarPopup")
})

btnLogin.addEventListener("click", (evt) => {
    if(servidor != null){
        const email = f_email.value
        let senha = f_senha.value
        if(senha == ""){
            senha = "-1"
        }

        const endpoint = `${servidor}/login/${email}/${senha}`
        fetch(endpoint)
        .then(res => res.json())
        .then(res =>{ 
            if(res.retorno == 200){ //OK
                sessionStorage.setItem("token", res.token)
                sessionStorage.setItem("id_token", res.insertId)
                sessionStorage.setItem("id", res.n_id_pessoa)
                sessionStorage.setItem("nome", res.s_nome_pessoa)
                window.location.href = "./main.html"

            }else if(res.retorno == 210){ // Primeiro Acesso
                primeiroAcesso.classList.remove("ocultarPopup")
                f_emailcadastro.value = f_email.value
                iddefsenha.value = res.n_id_pessoa  

            }else if(res.retorno == 209){ //Senha Errada  
                const config = {
                    titulo: "Erro!",
                    texto: "Senha Incorreta",
                    cor: "rgb(139, 0, 0)",
                    tipo: "ok",//sn ou ok
                    ok: () => {},
                    sim: () => {},
                    nao: () => {}
                }
                Cxmsg.mostrar(config)

            }
        })
    }
})

btnGravarSenha.addEventListener("click", (evt) => {
    if(f_senha1.value != "" && f_senha2.value != ""){
        if(f_senha1.value != f_senha2.value){
            const config = {
                titulo: "Alerta",
                texto: "Senhas não são iguais",
                cor: "rgb(139, 0, 0)",
                tipo: "ok",//sn ou ok
                ok: () => {},
                sim: () => {},
                nao: () => {}
            }
            Cxmsg.mostrar(config)

        }else{ //OK
            const dados = {
                n_id_pessoa:iddefsenha.value,
                s_senha_pessoa:f_senha2.value,
            }
        
            const cab ={
                method:"post",
                body:JSON.stringify(dados)
            }
            const endpoint = `${servidor}/gravarsenha`
            fetch(endpoint, cab)
            .then(res => {
                if(res.status == 200){
                    primeiroAcesso.classList.add("ocultarPopup")
                    f_senha.value = f_senha2.value
                }
            })
            
        }
    }else{
        const config = {
            titulo: "Alerta",
            texto: "Digite as senhas nos campos designados",
            cor: "rgb(139, 0, 0)",
            tipo: "ok",//sn ou ok
            ok: () => {},
            sim: () => {},
            nao: () => {}
        }
        Cxmsg.mostrar(config)
    }
})
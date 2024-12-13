import {Cxmsg} from "/Utilitarios/cxmsg.js"

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

const pagina = () => {

    const dadosGrid = document.querySelector("#dadosGrid")
    const btn_add = document.querySelector("#btn_add")
    const btn_pesq = document.querySelector("#btn_pesq")
    const novoColaborador = document.querySelector("#novoColaborador")
    const btnFecharPopup = document.querySelector("#btnFecharPopup")
    const btnFecharPopupPesq = document.querySelector("#btnFecharPopupPesq")
    const btn_gravar = document.querySelector("#btn_gravar")
    const btn_cancelar = document.querySelector("#btn_cancelar")
    const f_foto = document.querySelector("#f_foto")
    const img_foto = document.querySelector("#img_foto")
    const pesquisarColaborador = document.querySelector("#pesquisarColaborador")
    const btn_pesquisar = document.querySelector("#btn_pesquisar")
    const f_pesq = document.querySelector("#f_pesq")
    const btn_list = document.querySelector("#btn_list")
    const f_email = document.querySelector("#f_email")

    const f_nome = document.querySelector("#f_nome")
    const f_tipoColab = document.querySelector("#f_tipoColab")
    const f_status = document.querySelector("#f_status")
    const telefones = document.querySelector("#telefones")
    const f_fone = document.querySelector("#f_fone")

    const f_filtragem = document.querySelector("#f_filtragem")
    const f_pesqID = document.querySelector("#f_pesqID")
    const f_pesqNome = document.querySelector("#f_pesqNome")

    let modoJanela = "n" // n = Novo Colaborador / e = Editar Colaborador
    const servidor = sessionStorage.getItem("servidor_nodered")

    f_filtragem.addEventListener("keyup", (evt) => {
        const linhas = [...document.querySelectorAll(".linhaGrid")]
        let input, texto, filtragem
        input = evt.target
        filtragem = input.value.toUpperCase()
        for( let i = 0; i < linhas.length; i++){
            texto = linhas[i].children[1].innerHTML

            if(texto.toUpperCase().indexOf(filtragem) > -1){
                linhas[i].classList.remove("ocultarLinhaGrid")
            }else{
                linhas[i].classList.add("ocultarLinhaGrid")
            }
        }
    })

    const criaCaixaTelefone = (fone, idtel, tipo) => {
        const divtel = document.createElement("div")
        divtel.setAttribute("class","tel")
        
        const numTel = document.createElement("div")
        if(tipo == "n"){
            numTel.setAttribute("class","numTel novoTel")
        }else{
            numTel.setAttribute("class","numTel editarTel")
        }

        numTel.innerHTML=fone
        divtel.appendChild(numTel)
        
        const delTel = document.createElement("img")
        delTel.setAttribute("src","/Imagens/deletar.svg")
        delTel.setAttribute("class","delTel")
        delTel.setAttribute("data-idtel",idtel)
        delTel.setAttribute("id","delTel")
        delTel.addEventListener("click", (evt) => {
            if(idtel != "null"){
                evt.target.parentNode.remove()
                const objTel = evt.target.dataset.idtel
        
                const endpoint_deletarTEL = `${servidor}/delfone/${objTel}`
                fetch(endpoint_deletarTEL)
                .then(res => {
                    if(res.status == 200){
                        evt.target.parentNode.remove()
                    }
                })
            }else{
                evt.target.parentNode.remove()
            }
        })
        divtel.appendChild(delTel)
        telefones.appendChild(divtel)
    }

    const carregarTodosColabs = () => {
        const endpoint_todoscolaboradores = `${servidor}/todaspessoas`
        fetch(endpoint_todoscolaboradores)
        .then(res => res.json())
        .then(res =>{ 
            dadosGrid.innerHTML = ""
            res.forEach(e => {
                criarLinha(e)
            });
        })
    }

    carregarTodosColabs()

    const criarLinha = (e) => {
        const divlinha = document.createElement("div")
        divlinha.setAttribute("class", "linhaGrid")

        const divc1 = document.createElement("div")
        divc1.setAttribute("class", "colunaLinhaGrid c1")
        divc1.innerHTML = e.n_id_pessoa
        divlinha.appendChild(divc1)

        const divc2 = document.createElement("div")
        divc2.setAttribute("class", "colunaLinhaGrid c2")
        divc2.innerHTML = e.s_nome_pessoa
        divlinha.appendChild(divc2)

        const divc3 = document.createElement("div")
        divc3.setAttribute("class", "colunaLinhaGrid c3")
        divc3.innerHTML = e.n_id_tipopessoa
        divlinha.appendChild(divc3)

        const divc4 = document.createElement("div")
        divc4.setAttribute("class", "colunaLinhaGrid c4")
        divc4.innerHTML = e.c_status_pessoa
        divlinha.appendChild(divc4)

        const divc5 = document.createElement("div")
        divc5.setAttribute("class", "colunaLinhaGrid c5")
        divlinha.appendChild(divc5)

        const imgStatus = document.createElement("img")
        if(e.c_status_pessoa == "A"){
            imgStatus.setAttribute("src", "/Imagens/TurnON.svg")
        }else{
            imgStatus.setAttribute("src", "/Imagens/TurnOFF.svg")
        }
        imgStatus.setAttribute("data-idcolab", e.n_id_pessoa)
        imgStatus.setAttribute("class", "icone_op")
        imgStatus.setAttribute("title", "Alterar Status do Colaborador")
        imgStatus.addEventListener("click", (evt) => {
            const idcolab = evt.target.dataset.idcolab
            if(evt.target.getAttribute("src") == "/Imagens/TurnON.svg"){
                const endpoint_alterarcolab = `${servidor}/mudarStatusColab/${idcolab}/I`
                fetch(endpoint_alterarcolab)
                .then(res => {
                    if(res.status == 200){
                        evt.target.setAttribute("src", "/Imagens/TurnOFF.svg")
                        evt.target.parentNode.parentNode.childNodes[3].innerHTML = "I"
                    }
                })
            }else{
                const endpoint_alterarcolab = `${servidor}/mudarStatusColab/${idcolab}/A`
                fetch(endpoint_alterarcolab)
                .then(res => {
                    if(res.status == 200){
                        evt.target.setAttribute("src", "/Imagens/TurnON.svg")
                        evt.target.parentNode.parentNode.childNodes[3].innerHTML = "A"
                    }
                })
            }
        })
        divc5.appendChild(imgStatus)

        const imgEditar = document.createElement("img")
        imgEditar.setAttribute("src", "/Imagens/editar.svg")
        imgEditar.setAttribute("class", "icone_op")
        imgEditar.setAttribute("title", "Editar Colaborador")
        imgEditar.addEventListener("click", (evt) => {
            const id = evt.target.parentNode.parentNode.firstChild.innerHTML
            modoJanela = "e"
            document.getElementById("tituloPopup").innerHTML="Editar Pessoa"

            let endpoint = `${servidor}/dadoscolab/${id}` 
            fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                btn_gravar.setAttribute("data-idcolab", id)
                f_nome.value = res[0].s_nome_pessoa
                f_email.value = res[0].s_email_pessoa
                f_tipoColab.value = res[0].n_id_tipopessoa
                f_status.value = res[0].c_status_pessoa
                img_foto.src = res[0].s_foto_pessoa
                novoColaborador.classList.remove("ocultarPopup")
                
                // if(res[0].s_foto_pessoa == ""){
                //     campoForm2.classList.add("esconderElemento")
                // }else{
                //     campoForm2.classList.remove("esconderElemento")
                // }
            })
            novoColaborador.classList.remove("ocultarPopup")

            endpoint = `${servidor}/fonescolab/${id}` 
            fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                telefones.innerHTML = ""
                res.forEach(t => {
                    criaCaixaTelefone(t.s_telefone_contato, t.n_id_contato, "e")
                })

                novoColaborador.classList.remove("ocultarPopup") 
            })

            novoColaborador.classList.remove("ocultarPopup")

        })

        divc5.appendChild(imgEditar)

        const imgExcluir = document.createElement("img")
        imgExcluir.setAttribute("src", "/Imagens/deletar.svg")
        imgExcluir.setAttribute("class", "icone_op")
        imgExcluir.setAttribute("title", "Excluir Colaborador")
        
        imgExcluir.addEventListener("click", (evt) => {
            const id = evt.target.parentNode.parentNode.firstChild.innerHTML
            let endpoint = `${servidor}/deletarcolab/${id}` 
            fetch(endpoint)
            .then(res => res.json())
            .then(res => {
            })
            carregarTodosColabs()
        })

        divc5.appendChild(imgExcluir)

        dadosGrid.appendChild(divlinha)
    }

    const endpoint_tiposcolab = `${servidor}/tiposcolab`
    fetch(endpoint_tiposcolab)
    .then(res => res.json())
    .then(res =>{
        f_tipoColab.innerHTML = ""
        res.forEach(e => {
            const opt = document.createElement("option")
            opt.setAttribute("value",e.n_id_tipopessoa)
            opt.innerHTML = e.s_desc_tipopessoa
            f_tipoColab.appendChild(opt)
        })
        
    })

    btn_list.addEventListener("click", (evt) => {
        carregarTodosColabs()
    })

    btn_pesq.addEventListener("click", (evt) => {
        pesquisarColaborador.classList.remove("ocultarPopup")
        f_pesq.value = ""
        f_pesq.focus()
    })

    btnFecharPopupPesq.addEventListener("click", (evt) => {
        pesquisarColaborador.classList.add("ocultarPopup")
    })

    f_pesqID.addEventListener("click", (evt) => {
        f_pesq.value = ""
        f_pesq.focus()
    })

    f_pesqNome.addEventListener("click", (evt) => {
        f_pesq.value = ""
        f_pesq.focus()  
    })

    btn_pesquisar.addEventListener("click", (evt) => {
        if(f_pesq.value != ""){

            let tipo = null
            
            if(f_pesqID.checked){
                tipo = "id"
            }else{
                tipo = "nome"
            }

            const endpointPesq = `${servidor}/pesquisarColab/${tipo}/${f_pesq.value}`
            fetch(endpointPesq)
            .then(res => res.json())
            .then(res => {
                dadosGrid.innerHTML = ""
                res.forEach(e => {
                    criarLinha(e)
                });
            })

            pesquisarColaborador.classList.add("ocultarPopup")
        }else{
            const config = {
                titulo: "Alerta!",
                texto: "Preencha o campo de pesquisa",
                cor: "#00f",
                tipo: "ok",//sn ou ok
                ok: () => {},
                sim: () => {},
                nao: () => {}
            }
            Cxmsg.mostrar(config)
            //alert("Preencha o campo de pesquisa")
            f_pesq.focus()

        }
    })

    btn_add.addEventListener("click", (evt) => {
        modoJanela = "n"
        document.getElementById("tituloPopup").innerHTML="Nova Pessoa"
        novoColaborador.classList.remove("ocultarPopup") 
        // campoForm2.classList.add("esconderElemento")
        f_nome.value = ""
        f_nome.focus()
        f_email.value = ""
        f_tipoColab.value = ""
        f_status.value = ""
        f_foto.value = ""
        img_foto.setAttribute("src","#")
        telefones.innerHTML=""
    })

    btnFecharPopup.addEventListener("click", (evt) => {
        novoColaborador.classList.add("ocultarPopup")
    })

    btn_gravar.addEventListener("click", (evt) => {
        const tels = [...document.querySelectorAll(".novoTel")]
        let numTels = []
        tels.forEach(t => {
            numTels.push(t.innerHTML)
        })

        const dados = {
            n_id_pessoa:evt.target.dataset.idcolab,
            s_nome_pessoa:f_nome.value,
            s_email_pessoa:f_email.value,
            s_senha_pessoa:"",
            n_primacess_pessoa:1,
            n_id_tipopessoa:f_tipoColab.value,
            c_status_pessoa:f_status.value,
            numtelefones:numTels,
            s_foto_pessoa:img_foto.getAttribute("src")
        }

        const cab = {
            method:'post',
            body:JSON.stringify(dados)
        } 

        let endpointnovoeditarcolab = null
        if(modoJanela == "n"){
            endpointnovoeditarcolab = `${servidor}/novocolab`
        }else{
            endpointnovoeditarcolab = `${servidor}/editarcolab`
        }

        fetch(endpointnovoeditarcolab, cab)
        .then(res=>{
            if(res.status == 200){
                if(modoJanela == "n"){
                    const config = {
                        titulo: "Sucesso!",
                        texto: "Nova pessoa gravada",
                        cor: "rgb(23, 23, 126)",
                        tipo: "ok",//sn ou ok
                        ok: () => {},
                        sim: () => {},
                        nao: () => {}
                    }
                    Cxmsg.mostrar(config)

                    f_nome.value = ""
                    f_tipoColab.value = ""
                    f_status.value = ""
                    f_foto.value = ""
                    img_foto.setAttribute("src","#")
                    telefones.innerHTML=""
                    carregarTodosColabs()
                }else{
                    const config = {
                        titulo: "Sucesso!",
                        texto: "Pessoa editada com sucesso",
                        cor: "rgb(23, 23, 126)",
                        tipo: "ok",//sn ou ok
                        ok: () => {},
                        sim: () => {},
                        nao: () => {}
                    }
                    Cxmsg.mostrar(config)

                    novoColaborador.classList.add("ocultarPopup")
                }
            }else{
                const config = {
                    titulo: "Erro!",
                    texto: "Erro ao gravar nova pessoa",
                    cor: "rgb(139, 0, 0)",
                    tipo: "ok",//sn ou ok
                    ok: () => {},
                    sim: () => {},
                    nao: () => {}
                }
                Cxmsg.mostrar(config)
            }
        }).finally(() => {
            // campoForm2.classList.add("esconderElemento")
            carregarTodosColabs()
        })
    })

    btn_cancelar.addEventListener("click", (evt) => {
        novoColaborador.classList.add("ocultarPopup")
    })

    f_fone.addEventListener("keyup", (evt) => {
        if(evt.key == "Enter"){

            if(evt.target.value.length >= 8){

                criaCaixaTelefone(evt.target.value, null, "n")
                
                evt.target.value = ""
            }else{
                const config = {
                    titulo: "Erro!",
                    texto: "Número de Telefone inválido",
                    cor: "rgb(139, 0, 0)",
                    tipo: "ok",//sn ou ok
                    ok: () => {},
                    sim: () => {},
                    nao: () => {}
                }
                Cxmsg.mostrar(config)

            }
        }
    })

    const converterImagemB64 = (localDestino, arquivoIMG) => {
        const obj = arquivoIMG
        const reader = new FileReader()
        reader.addEventListener("load", (evt) => {
            const res = reader.result
            localDestino.src = res
        })
        if(obj){
            reader.readAsDataURL(obj)
        }
    }

    f_foto.addEventListener("change", (evt) => {
        converterImagemB64(img_foto, evt.target.files[0])
    })
}
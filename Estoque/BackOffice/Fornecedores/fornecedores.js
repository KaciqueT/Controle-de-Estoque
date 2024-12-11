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
    const novoFornecedor = document.querySelector("#novoFornecedor")
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
    const campoForm2 = document.querySelector(".campoForm2")

    const btnFecharPopupListaContatos = document.querySelector("#btnFecharPopupListaContatos")
    const listaContatosForn = document.querySelector("#listaContatosForn")
    const btn_listarContatosForn = document.querySelector("#btn_listarContatosForn")
    const dadosGrid_grid_ContatosForn = document.querySelector("#dadosGrid_grid_ContatosForn")
    const dadosGrid_grid_ListaContatosForn = document.querySelector("#dadosGrid_grid_ListaContatosForn")

    const telefonesForn = document.querySelector("#telefonesForn")
    const btnFecharPopuptelefonesForn = document.querySelector("#btnFecharPopuptelefonesForn")
    const dadosGrid_grid_telefonesForn = document.querySelector("#dadosGrid_grid_telefonesForn")

    const f_nome = document.querySelector("#f_nome")
    const f_status = document.querySelector("#f_status")
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

    const carregarTodosFornecedores = () => {
        const endpoint = `${servidor}/todosfornecedores`
        fetch(endpoint)
        .then(res => res.json())
        .then(res =>{ 
            dadosGrid.innerHTML = ""
            res.forEach(e => {
                criarLinha(e)
            });
        })
    }

    carregarTodosFornecedores()

    const criarLinha = (e) => {
        const divlinha = document.createElement("div")
        divlinha.setAttribute("class", "linhaGrid")

        const divc1 = document.createElement("div")
        divc1.setAttribute("class", "colunaLinhaGrid c1")
        divc1.innerHTML = e.n_id_fornecedor 
        divlinha.appendChild(divc1)

        const divc2 = document.createElement("div")
        divc2.setAttribute("class", "colunaLinhaGrid c2")
        divc2.innerHTML = e.s_desc_fornecedor
        divlinha.appendChild(divc2)

        const divc3 = document.createElement("div")
        divc3.setAttribute("class", "colunaLinhaGrid c3")
        divc3.innerHTML = e.c_status_fornecedor
        divlinha.appendChild(divc3)

        const divc4 = document.createElement("div")
        divc4.setAttribute("class", "colunaLinhaGrid c4")
        divlinha.appendChild(divc4)

        const imgStatus = document.createElement("img")
        if(e.c_status_fornecedor == "A"){
            imgStatus.setAttribute("src", "/Imagens/TurnON.svg")
        }else{
            imgStatus.setAttribute("src", "/Imagens/TurnOFF.svg")
        }
        imgStatus.setAttribute("data-idforne", e.n_id_fornecedor)
        imgStatus.setAttribute("class", "icone_op")
        imgStatus.setAttribute("title", "Alterar Status do Fornecedor")
        imgStatus.addEventListener("click", (evt) => {
            const idforne = evt.target.dataset.idforne
            if(evt.target.getAttribute("src") == "/Imagens/TurnON.svg"){
                const endpoint_alterarcolab = `${servidor}/mudarStatusForn/${idforne}/I`
                fetch(endpoint_alterarcolab)
                .then(res => {
                    if(res.status == 200){
                        evt.target.setAttribute("src", "/Imagens/TurnOFF.svg")
                        evt.target.parentNode.parentNode.childNodes[2].innerHTML = "I"
                    }
                })
            }else{
                const endpoint_alterarcolab = `${servidor}/mudarStatusForn/${idforne}/A`
                fetch(endpoint_alterarcolab)
                .then(res => {
                    if(res.status == 200){
                        evt.target.setAttribute("src", "/Imagens/TurnON.svg")
                        evt.target.parentNode.parentNode.childNodes[2].innerHTML = "A"
                    }
                })
            }
        })
        divc4.appendChild(imgStatus)

        const imgEditar = document.createElement("img")
        imgEditar.setAttribute("src", "/Imagens/editar.svg")
        imgEditar.setAttribute("class", "icone_op")
        imgEditar.setAttribute("title", "Editar Fornecedor")
        imgEditar.addEventListener("click", (evt) => {
            const id = evt.target.parentNode.parentNode.firstChild.innerHTML
            modoJanela = "e"
            document.getElementById("tituloPopup").innerHTML="Editar Colaborador"

            let endpoint = `${servidor}/dadosforn/${id}` 
            fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                btn_gravar.setAttribute("data-idforne", id)
                f_nome.value = res[0].s_desc_fornecedor
                f_status.value = res[0].c_status_fornecedor
                img_foto.src = res[0].s_foto_fornecedor
                novoFornecedor.classList.remove("ocultarPopup")
                if(res[0].s_foto_fornecedor == ""){
                    campoForm2.classList.add("esconderElemento")
                }else{
                    campoForm2.classList.remove("esconderElemento")
                }
            })
            novoFornecedor.classList.remove("ocultarPopup")

        })
        divc4.appendChild(imgEditar)

        const imgExcluir = document.createElement("img")
        imgExcluir.setAttribute("src", "/Imagens/deletar.svg")
        imgExcluir.setAttribute("class", "icone_op")
        imgExcluir.setAttribute("title", "Excluir Fornecedor")

        imgExcluir.addEventListener("click", (evt) => {
            const id = evt.target.parentNode.parentNode.firstChild.innerHTML
            let endpoint = `${servidor}/deletarforn/${id}` 
            fetch(endpoint)
            .then(res => res.json())
            .then(res => {
            })
            carregarTodosFornecedores()
        })

        divc4.appendChild(imgExcluir)

        dadosGrid.appendChild(divlinha)
    }

    btn_list.addEventListener("click", (evt) => {
        carregarTodosFornecedores()
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

            const endpointPesq = `${servidor}/pesquisarForn/${tipo}/${f_pesq.value}`
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
        document.getElementById("tituloPopup").innerHTML="Novo Colaborador"
        novoFornecedor.classList.remove("ocultarPopup") 
        campoForm2.classList.add("esconderElemento")
        f_nome.value = ""
        f_nome.focus()
        f_status.value = ""
        f_foto.value = ""
        img_foto.setAttribute("src","#")
    })

    btnFecharPopup.addEventListener("click", (evt) => {
        novoFornecedor.classList.add("ocultarPopup")
    })

    btn_gravar.addEventListener("click", (evt) => {
        const contat = [...document.querySelectorAll(".novoContForn")]
        let arrayConts= []
        contat.forEach(t => {
            arrayConts.push(t.firstChild.innerHTML)
        })


        const dados = {
            n_id_fornecedor :evt.target.dataset.idforne,
            s_desc_fornecedor:f_nome.value,
            c_status_fornecedor:f_status.value,
            listaContatos:arrayConts,
            s_foto_fornecedor:img_foto.getAttribute("src")
        }

        const cab = {
            method:'post',
            body:JSON.stringify(dados)
        } 

        let endpointnovoeditarforn = null
        if(modoJanela == "n"){
            endpointnovoeditarforn = `${servidor}/novoforn`
        }else{
            endpointnovoeditarforn = `${servidor}/editarforn`
        }

        fetch(endpointnovoeditarforn, cab)
        .then(res=>{
            if(res.status == 200){
                if(modoJanela == "n"){
                    const config = {
                        titulo: "Sucesso!",
                        texto: "Novo colaborador gravado",
                        cor: "rgb(23, 23, 126)",
                        tipo: "ok",//sn ou ok
                        ok: () => {},
                        sim: () => {},
                        nao: () => {}
                    }
                    Cxmsg.mostrar(config)

                    f_nome.value = ""
                    f_status.value = ""
                    f_foto.value = ""
                    img_foto.setAttribute("src","#")
                }else{
                    const config = {
                        titulo: "Sucesso!",
                        texto: "Colaborador editado com sucesso",
                        cor: "rgb(23, 23, 126)",
                        tipo: "ok",//sn ou ok
                        ok: () => {},
                        sim: () => {},
                        nao: () => {}
                    }
                    Cxmsg.mostrar(config)
                    novoFornecedor.classList.add("ocultarPopup")
                }
            }else{
                const config = {
                    titulo: "Erro!",
                    texto: "Erro ao gravar novo colaborador",
                    cor: "rgb(139, 0, 0)",
                    tipo: "ok",//sn ou ok
                    ok: () => {},
                    sim: () => {},
                    nao: () => {}
                }
                Cxmsg.mostrar(config)
            }
        }).finally(() => {
            campoForm2.classList.add("esconderElemento")
            carregarTodosFornecedores()
        })
    })

    btn_cancelar.addEventListener("click", (evt) => {
        novoFornecedor.classList.add("ocultarPopup")
        console.log(maiorZIndex())
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

    btnFecharPopupListaContatos.addEventListener("click", (evt) => {
        listaContatosForn.classList.add("ocultarPopup")
    })

    btnFecharPopuptelefonesForn.addEventListener("click", (evt) => {
        telefonesForn.classList.add("ocultarPopup")
    })

    const addContatoForn = (id, nome) => {
        const divlinha = document.createElement("div")
        divlinha.setAttribute("class", "linhaGrid novoContForn")

        const divc1 = document.createElement("div")
        divc1.setAttribute("class", "colunaLinhaGrid c1_Forn")
        divc1.innerHTML = id
        divlinha.appendChild(divc1)

        const divc2 = document.createElement("div")
        divc2.setAttribute("class", "colunaLinhaGrid c2_Forn")
        divc2.innerHTML = nome
        divlinha.appendChild(divc2)

        const divc3 = document.createElement("div")
        divc3.setAttribute("class", "colunaLinhaGrid c3_Forn")
        divlinha.appendChild(divc3)

        const imgRemoverContato = document.createElement("img")
        imgRemoverContato.setAttribute("src", "/Imagens/deletar.svg")
        imgRemoverContato.setAttribute("class", "icone_op")
        imgRemoverContato.addEventListener("click", (evt) => {
            evt.target.parentNode.parentNode.remove()
        })
        divc3.appendChild(imgRemoverContato)

        const imgVerContato = document.createElement("img")
        imgVerContato.setAttribute("src", "/Imagens/verContato.svg")
        imgVerContato.setAttribute("class", "icone_op")
        imgVerContato.addEventListener("click", (evt) => {
            const id = evt.target.parentNode.parentNode.firstChild.innerHTML
            let endpoint = `${servidor}/retornaTelefone/${id}` 
            fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                let mzi = maiorZIndex()+2
                telefonesForn.setAttribute("style",`z-index:${mzi} !important`)

                telefonesForn.classList.remove("ocultarPopup")
                dadosGrid_grid_telefonesForn.innerHTML = ""

                res.forEach(e => {
                    addTelefoneContatoForn(e.s_telefone_contato)
                })
            })
            novoFornecedor.classList.remove("ocultarPopup")
        })
        divc3.appendChild(imgVerContato)

        dadosGrid_grid_ListaContatosForn.appendChild(divlinha)
    }

    const addTelefoneContatoForn = (telefone) => {
        const divlinha = document.createElement("div")
        divlinha.setAttribute("class", "linhaGrid")

        const divc2 = document.createElement("div")
        divc2.setAttribute("class", "colunaLinhaGrid c2_Forn")
        divc2.innerHTML = telefone
        divlinha.appendChild(divc2)

        dadosGrid_grid_telefonesForn.appendChild(divlinha)
    }

    const criarLinhaForn = (e) => {
        const divlinha = document.createElement("div")
        divlinha.setAttribute("class", "linhaGrid")

        const divc1 = document.createElement("div")
        divc1.setAttribute("class", "colunaLinhaGrid c1_Forn")
        divc1.innerHTML = e.n_id_pessoa
        divlinha.appendChild(divc1)

        const divc2 = document.createElement("div")
        divc2.setAttribute("class", "colunaLinhaGrid c2_Forn")
        divc2.innerHTML = e.s_nome_pessoa
        divlinha.appendChild(divc2)

        const divc3 = document.createElement("div")
        divc3.setAttribute("class", "colunaLinhaGrid c3_Forn")
        divlinha.appendChild(divc3)

        const imgAdicionarContato = document.createElement("img")
        imgAdicionarContato.setAttribute("src", "/Imagens/adicionarContato.svg")
        imgAdicionarContato.setAttribute("data-idforne", e.n_id_fornecedor)
        imgAdicionarContato.setAttribute("class", "icone_op")
        imgAdicionarContato.addEventListener("click", (evt) => {
            const linha = evt.target.parentNode.parentNode
            const id = evt.target.parentNode.parentNode.childNodes[0].innerHTML
            const nome = evt.target.parentNode.parentNode.childNodes[1].innerHTML
            addContatoForn(id, nome)
        })
        divc3.appendChild(imgAdicionarContato)

        const imgVerContato = document.createElement("img")
        imgVerContato.setAttribute("src", "/Imagens/verContato.svg")
        imgVerContato.setAttribute("class", "icone_op")
        imgVerContato.addEventListener("click", (evt) => {
            const id = evt.target.parentNode.parentNode.firstChild.innerHTML
            let endpoint = `${servidor}/retornaTelefone/${id}` 
            fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                let mzi = maiorZIndex()+2
                telefonesForn.setAttribute("style",`z-index:${mzi} !important`)

                telefonesForn.classList.remove("ocultarPopup")
                dadosGrid_grid_telefonesForn.innerHTML = ""

                res.forEach(e => {
                    addTelefoneContatoForn(e.s_telefone_contato)
                })
            })
            novoFornecedor.classList.remove("ocultarPopup")
        })
        divc3.appendChild(imgVerContato)

        dadosGrid_grid_ContatosForn.appendChild(divlinha)
    }

    btn_listarContatosForn.addEventListener("click", (evt) => {
        listaContatosForn.classList.remove("ocultarPopup")
        let mzi = maiorZIndex()+1
        listaContatosForn.setAttribute("style",`z-index:${mzi} !important`)

        dadosGrid_grid_ContatosForn.innerHTML = ""
        
        let endpoint = `${servidor}/todaspessoasForn` 
        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            res.forEach(e => {

                criarLinhaForn(e)
            })
        })
    })
}
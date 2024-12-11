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

    const novoProduto = document.querySelector("#novoProduto")
    const f_tipoprod = document.querySelector("#f_tipoprod")
    const f_fornprod = document.querySelector("#f_fornprod")
    const movEstoque = document.querySelector("#movEstoque")
    const btnFecharPopupMov = document.querySelector("#btnFecharPopupMov")
    const f_codigoprodMOV = document.querySelector("#f_codigoprodMOV")
    const f_descprodMOV = document.querySelector("#f_descprodMOV")
    const f_qtdeprodMOV = document.querySelector("#f_qtdeprodMOV")
    const f_qtdeprodReg = document.querySelector("#f_qtdeprodReg")
    const btn_gravar = document.querySelector("#btn_gravar")
    const btn_cancelar = document.querySelector("#btn_cancelar")
    const btn_addQtde = document.querySelector("#btn_addQtde")
    const btn_removeQtde = document.querySelector("#btn_removeQtde")
    const btn_gravarMov = document.querySelector("#btn_gravarMov")

    const dadosGrid = document.querySelector("#dadosGrid")
    const btn_add = document.querySelector("#btn_add")
    const btn_pesq = document.querySelector("#btn_pesq")
    const btnFecharPopup = document.querySelector("#btnFecharPopup")
    const btnFecharPopupPesq = document.querySelector("#btnFecharPopupPesq")
    const f_foto = document.querySelector("#f_foto")
    const img_foto = document.querySelector("#img_foto")
    const pesquisarColaborador = document.querySelector("#pesquisarColaborador")
    const btn_pesquisar = document.querySelector("#btn_pesquisar")
    const f_pesq = document.querySelector("#f_pesq")
    const btn_list = document.querySelector("#btn_list")

    const f_status = document.querySelector("#f_status")

    const f_filtragem = document.querySelector("#f_filtragem")
    const f_pesqID = document.querySelector("#f_pesqID")
    const f_pesqNome = document.querySelector("#f_pesqNome")

    let modoJanela = "n" // n = Novo Colaborador / e = Editar Colaborador
    const servidor = sessionStorage.getItem("servidor_nodered")

    const listTiposProd = () => {
        const endpoint = `${servidor}/tiposproduto`
        fetch(endpoint)
        .then(res => res.json())
        .then(res =>{
            f_tipoprod.innerHTML = ""
            res.forEach(e => {
                const opt = document.createElement("option")
                opt.setAttribute("value", e.n_id_tipoproduto)
                opt.innerHTML = e.s_desc_tipoproduto
                f_tipoprod.appendChild(opt)
            })
            
        })
    }

    const listFornProd = () => {
        const endpoint = `${servidor}/fornproduto`
        fetch(endpoint)
        .then(res => res.json())
        .then(res =>{
            f_fornprod.innerHTML = ""
            res.forEach(e => {
                const opt = document.createElement("option")
                opt.setAttribute("value", e.n_id_fornecedor)
                opt.innerHTML = e.s_desc_fornecedor
                f_fornprod.appendChild(opt)
            })
            
        })
    }

    listTiposProd()
    listFornProd()

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

    const carregarTodosProd = () => {
        const endpoint = `${servidor}/todosprodutos`
        fetch(endpoint)
        .then(res => res.json())
        .then(res =>{ 
            dadosGrid.innerHTML = ""
            res.forEach(e => {
                criarLinha(e)
            });
        })
    }

    carregarTodosProd()

    const criarLinha = (e) => {
        const divlinha = document.createElement("div")
        divlinha.setAttribute("class", "linhaGrid")

        const divc1 = document.createElement("div")
        divc1.setAttribute("class", "colunaLinhaGrid c1")
        divc1.innerHTML = e.n_code_produto
        divlinha.appendChild(divc1)

        const divc2 = document.createElement("div")
        divc2.setAttribute("class", "colunaLinhaGrid c2")
        divc2.innerHTML = e.s_desc_produto
        divlinha.appendChild(divc2)

        const divc3 = document.createElement("div")
        divc3.setAttribute("class", "colunaLinhaGrid c3")
        divc3.innerHTML = e.n_id_tipoproduto
        divlinha.appendChild(divc3)

        const divc4 = document.createElement("div")
        divc4.setAttribute("class", "colunaLinhaGrid c4")
        divc4.innerHTML = e.c_status_produto
        divlinha.appendChild(divc4)

        const divc5 = document.createElement("div")
        divc5.setAttribute("class", "colunaLinhaGrid c4")
        divc5.innerHTML = e.n_qtde_produto
        divlinha.appendChild(divc5)

        const divc6 = document.createElement("div")
        divc6.setAttribute("class", "colunaLinhaGrid c6")
        divlinha.appendChild(divc6)

        const imgStatus = document.createElement("img")
        if(e.c_status_produto == "A"){
            imgStatus.setAttribute("src", "/Imagens/TurnON.svg")
        }else{
            imgStatus.setAttribute("src", "/Imagens/TurnOFF.svg")
        }
        imgStatus.setAttribute("data-idprod", e.n_code_produto)
        imgStatus.setAttribute("class", "icone_op")
        imgStatus.setAttribute("title", "Alterar Status do Produto")
        imgStatus.addEventListener("click", (evt) => {
            const idprod = evt.target.dataset.idprod
            if(evt.target.getAttribute("src") == "/Imagens/TurnON.svg"){
                const endpoint_alterar = `${servidor}/mudarStatusProd/${idprod}/I`
                fetch(endpoint_alterar)
                .then(res => {
                    if(res.status == 200){
                        evt.target.setAttribute("src", "/Imagens/TurnOFF.svg")
                        evt.target.parentNode.parentNode.childNodes[3].innerHTML = "I"
                    }
                })
            }else{
                const endpoint_alterar = `${servidor}/mudarStatusProd/${idprod}/A`
                fetch(endpoint_alterar)
                .then(res => {
                    if(res.status == 200){
                        evt.target.setAttribute("src", "/Imagens/TurnON.svg")
                        evt.target.parentNode.parentNode.childNodes[3].innerHTML = "A"
                    }
                })
            }
        })
        divc6.appendChild(imgStatus)

        const imgEditar = document.createElement("img")
        imgEditar.setAttribute("src", "/Imagens/editar.svg")
        imgEditar.setAttribute("class", "icone_op")
        imgEditar.setAttribute("title", "Editar Produto")
        imgEditar.addEventListener("click", (evt) => {
            const id = evt.target.parentNode.parentNode.firstChild.innerHTML
            modoJanela = "e"
            document.getElementById("tituloPopup").innerHTML="Editar Produto"

            let endpoint = `${servidor}/dadosprod/${id}` 
            fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                btn_gravar.setAttribute("data-idprod", id)
                f_codigoprod.value = res[0].n_code_produto
                f_descprod.value = res[0].s_desc_produto
                f_qtdeprod.value = res[0].n_qtde_produto
                f_tipoprod.value = res[0].n_id_tipoproduto 
                f_fornprod.value = res[0].n_id_fornecedor 
                f_status.value = res[0].c_status_produto
                img_foto.src = res[0].s_foto_produto
                novoProduto.classList.remove("ocultarPopup")
                
                // if(res[0].s_foto_pessoa == ""){
                //     campoForm2.classList.add("esconderElemento")
                // }else{
                //     campoForm2.classList.remove("esconderElemento")
                // }
            })
            novoProduto.classList.remove("ocultarPopup")

        })

        divc6.appendChild(imgEditar)

        const imgMovimentar = document.createElement("img")
        imgMovimentar.setAttribute("src", "/Imagens/mov.svg")
        imgMovimentar.setAttribute("class", "icone_op")
        imgMovimentar.setAttribute("title", "Movimentar Produtos")
        
        imgMovimentar.addEventListener("click", (evt) => {
            const l = evt.target.parentNode.parentNode

            if(l.childNodes[3].innerHTML == "A"){
                f_codigoprodMOV.value = l.childNodes[0].innerHTML
                f_descprodMOV.value = l.childNodes[1].innerHTML
                f_qtdeprodMOV.value = l.childNodes[4].innerHTML

                movEstoque.classList.remove("ocultarPopup")
            }else{
                const config = {
                    titulo: "Alerta!",
                    texto: "Produto com status inativo não pode ser editado.",
                    cor: "#722F37",
                    tipo: "ok",//sn ou ok
                    ok: () => {},
                    sim: () => {},
                    nao: () => {}
                }
                Cxmsg.mostrar(config)
            }

            
        })
        
        
        // imgExcluir.addEventListener("click", (evt) => {
        //     const id = evt.target.parentNode.parentNode.firstChild.innerHTML
        //     let endpoint = `${servidor}/deletarprod/${id}` 
        //     fetch(endpoint)
        //     .then(res => res.json())
        //     .then(res => {
        //     })
        //     carregarTodosProd()
        // })

        divc6.appendChild(imgMovimentar)

        dadosGrid.appendChild(divlinha)
    }

    btn_list.addEventListener("click", (evt) => {
        carregarTodosProd()
    })

    btn_pesq.addEventListener("click", (evt) => {
        pesquisarColaborador.classList.remove("ocultarPopup")
        f_pesq.value = ""
        f_pesq.focus()
    })

    btnFecharPopupMov.addEventListener("click", (evt) => {
        movEstoque.classList.add("ocultarPopup")
    })

    btnFecharPopupPesq.addEventListener("click", (evt) => {
        pesquisarColaborador.classList.add("ocultarPopup")
    })

    btn_cancelar.addEventListener("click", (evt) => {
        novoProduto.classList.add("ocultarPopup")
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

            const endpointPesq = `${servidor}/pesquisarProd/${tipo}/${f_pesq.value}`
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

    btn_addQtde.addEventListener("click", (evt) => {
        let qtdeatual = parseInt(f_qtdeprodMOV.value)
        let qtdeadd = parseInt(f_qtdeprodReg.value)
        
        qtdeatual += qtdeadd

        f_qtdeprodMOV.value = qtdeatual

        f_qtdeprodReg.value = '0'
    })

    btn_removeQtde.addEventListener("click", (evt) => {
        let qtdeatual = parseInt(f_qtdeprodMOV.value)
        let qtdesub = parseInt(f_qtdeprodReg.value)
        
        if(qtdesub <= qtdeatual){
            qtdeatual -= qtdesub
        }else{
            const config = {
                titulo: "Alerta!",
                texto: "Estoque insuficiente.",
                cor: "#722F37",
                tipo: "ok",//sn ou ok
                ok: () => {},
                sim: () => {},
                nao: () => {}
            }
            Cxmsg.mostrar(config)
        }

        f_qtdeprodMOV.value = qtdeatual

        f_qtdeprodReg.value = '0'
    })

    btn_gravarMov.addEventListener("click", (evt) => {
        const dados = {
            n_code_produto:f_codigoprodMOV.value,
            n_qtde_produto:f_qtdeprodMOV.value,
        }

        const cab ={
            method:"post",
            body:JSON.stringify(dados)
        }
        const endpoint = `${servidor}/editarMOVprod`
        fetch(endpoint, cab)
        .then(res => {
            carregarTodosProd()
        })
    })

    btn_add.addEventListener("click", (evt) => {
        modoJanela = "n"
        document.getElementById("tituloPopup").innerHTML="Novo Produto"
        novoProduto.classList.remove("ocultarPopup") 
        // campoForm2.classList.add("esconderElemento")
        f_codigoprod.value = ""
        f_codigoprod.focus()
        f_descprod.value = ""
        f_qtdeprod.value = "1"
        f_tipoprod.value = ""
        f_fornprod.value = ""
        f_status.value = ""
        img_foto.setAttribute("src","#")
    })

    btnFecharPopup.addEventListener("click", (evt) => {
        novoProduto.classList.add("ocultarPopup")
    })

    btn_gravar.addEventListener("click", (evt) => {

        const dados = {
            n_code_produto:f_codigoprod.value,
            n_id_tipoproduto:f_tipoprod.value,
            s_desc_produto:f_descprod.value,
            n_id_fornecedor:f_fornprod.value,
            n_qtde_produto:f_qtdeprod.value,
            c_status_produto:f_status.value,
            s_foto_produto:img_foto.getAttribute("src")
        }

        const cab = {
            method:'post',
            body:JSON.stringify(dados)
        } 

        let endpointnovoeditarcolab = null
        if(modoJanela == "n"){
            endpointnovoeditarcolab = `${servidor}/novoprod`
        }else{
            endpointnovoeditarcolab = `${servidor}/editarprod`
        }

        fetch(endpointnovoeditarcolab, cab)
        .then(res=>{
            if(res.status == 200){
                if(modoJanela == "n"){
                    const config = {
                        titulo: "Sucesso!",
                        texto: "Novo produto adicionado!",
                        cor: "rgb(23, 23, 126)",
                        tipo: "ok",//sn ou ok
                        ok: () => {},
                        sim: () => {},
                        nao: () => {}
                    }
                    Cxmsg.mostrar(config)


                    f_codigoprod.value = ""
                    f_descprod.value = ""
                    f_qtdeprod.value = "1"
                    f_tipoprod.value = ""
                    f_fornprod.value = ""
                    f_status.value = ""
                    img_foto.setAttribute("src","#")
                    carregarTodosProd()
                }else{
                    const config = {
                        titulo: "Sucesso!",
                        texto: "Produto editado com sucesso",
                        cor: "rgb(23, 23, 126)",
                        tipo: "ok",//sn ou ok
                        ok: () => {},
                        sim: () => {},
                        nao: () => {}
                    }
                    Cxmsg.mostrar(config)
                    novoProduto.classList.add("ocultarPopup")
                }
            }else{
                const config = {
                    titulo: "Erro!",
                    texto: "Erro ao gravar novo produto",
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
            carregarTodosProd()
        })
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
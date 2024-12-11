class Cxmsg{
    // const btn_list = document.querySelector("#btn_list")
    static config = null

    // static config = {
    //     titulo: "",
    //     texto: "",
    //     cor: "",
    //     ok: null,
    //     sim: null,
    //     nao: null
    // }

    static mostrar = (config) => {
        this.config = config

        const cxmsgfundo = document.createElement("div")
        cxmsgfundo.setAttribute("class","cxmsg_fundo")
        cxmsgfundo.setAttribute("id","cxmsg_fundo")

            const cxmsg = document.createElement("div")
            cxmsg.setAttribute("class","cxmsg")
            cxmsgfundo.appendChild(cxmsg)

                const cxmsg_titulo = document.createElement("div")
                cxmsg_titulo.setAttribute("class", "cxmsg_titulo")
                cxmsg_titulo.setAttribute("style", `background-color: ${config.cor} !important`)
                cxmsg.appendChild(cxmsg_titulo)

                    const p_titulo = document.createElement("p")
                    p_titulo.innerHTML = config.titulo
                    cxmsg_titulo.appendChild(p_titulo)

                    const imgfechar_titulo = document.createElement("img")
                    imgfechar_titulo.setAttribute("class","btn_fechar")
                    imgfechar_titulo.setAttribute("id","btn_fechar")
                    imgfechar_titulo.setAttribute("src","/Imagens/fechar.svg")
                    imgfechar_titulo.addEventListener("click", (evt) => {
                        this.fechar()
                    })
                    cxmsg_titulo.appendChild(imgfechar_titulo)

                const cxmsg_corpo = document.createElement("div")
                cxmsg_corpo.setAttribute("class","cxmsg_corpo")
                cxmsg.appendChild(cxmsg_corpo)

                    const texto_cxmsg = document.createElement("p")
                    texto_cxmsg.setAttribute("class", "texto_cxmsg")
                    texto_cxmsg.innerHTML = config.texto
                    cxmsg_corpo.appendChild(texto_cxmsg)

                const cxmsg_rodape = document.createElement("div")
                cxmsg_rodape.setAttribute("class","cxmsg_rodape")
                cxmsg_rodape.setAttribute("id","cxmsg_rodape")
                cxmsg.appendChild(cxmsg_rodape)

                if(config.tipo == "ok"){

                    const btn_ok_cxmsg = document.createElement("button")
                    btn_ok_cxmsg.setAttribute("class","btn_cxmsg")
                    btn_ok_cxmsg.setAttribute("id","btn_ok_cxmsg")
                    btn_ok_cxmsg.innerHTML = "OK"
                    btn_ok_cxmsg.addEventListener("click", (evt) => {
                        config.ok()
                        this.fechar()
                    })
                    cxmsg_rodape.appendChild(btn_ok_cxmsg)

                }else if(config.tipo == "sn"){

                    const btn_sim_cxmsg = document.createElement("button")
                    btn_sim_cxmsg.setAttribute("class","btn_cxmsg")
                    btn_sim_cxmsg.setAttribute("id","btn_sim_cxmsg")
                    btn_sim_cxmsg.innerHTML = "SIM"
                    btn_sim_cxmsg.addEventListener("click", (evt) => {
                        config.sim()
                        this.fechar()
                    })
                    cxmsg_rodape.appendChild(btn_sim_cxmsg)

                    const btn_nao_cxmsg = document.createElement("button")
                    btn_nao_cxmsg.setAttribute("class","btn_cxmsg")
                    btn_nao_cxmsg.setAttribute("id","btn_nao_cxmsg")
                    btn_nao_cxmsg.innerHTML = "NAO"
                    btn_nao_cxmsg.addEventListener("click", (evt) => {
                        config.nao()
                        this.fechar()
                    })
                    cxmsg_rodape.appendChild(btn_nao_cxmsg)
                } 
        document.body.prepend(cxmsgfundo)
    }

    static fechar = () =>{
        document.getElementById("cxmsg_fundo").remove()
    }

}

export {Cxmsg}

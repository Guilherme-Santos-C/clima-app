const api = {
    url:"https://api.weatherapi.com/v1/current.json",
    key:"154b47968a624563a5d230136230409",
}

const input_cidade = document.querySelector(".input-section1");
const button_ip = document.querySelector(".button-section1");
const section2 = document.getElementById("section-2");
const altura_tela = window.screen.height;
const largura_tela = window.screen.width;

const condicoes_meteorologicas_portuges = {
    1000: 'Céu limpo',
    1003: 'Parcialmente nublado',
    1006: 'Céu nublado',
    1009: 'Céu encoberto',
    1030: 'Neblina',
    1063: 'Possibilidade de chuva isolada',
    1066: 'Possibilidade de neve isolada',
    1069: 'Possibilidade de chuva de granizo isolada',
    1072: 'Possibilidade de chuva de granizo leve isolada',
    1087: 'Possibilidade de tempestade',
    1114: 'Neve soprando',
    1117: 'Tempestade de neve',
    1135: 'Nevoeiro',
    1147: 'Nevoeiro congelante',
    1150: 'Garoa leve isolada',
    1153: 'Garoa leve',
    1168: 'Garoa congelante',
    1171: 'Garoa congelante intensa',
    1180: 'Chuva fraca isolada',
    1183: 'Chuva leve',
    1186: 'Chuva moderada às vezes',
    1189: 'Chuva moderada',
    1192: 'Chuva intensa às vezes',
    1195: 'Chuva intensa',
    1198: 'Chuva congelante leve',
    1201: 'Chuva congelante moderada ou intensa',
    1204: 'Chuva de granizo leve',
    1207: 'Chuva de granizo moderada ou intensa',
    1210: 'Possibilidade de neve leve',
    1213: 'Neve leve',
    1216: 'Possibilidade de neve moderada',
    1219: 'Neve moderada',
    1222: 'Possibilidade de neve intensa',
    1225: 'Neve intensa',
    1237: 'Pelotas de gelo',
    1240: 'Chuva leve',
    1243: 'Chuva moderada ou intensa',
    1246: 'Chuva torrencial',
    1249: 'Chuva de granizo leve',
    1252: 'Chuva de granizo moderada ou intensa',
    1255: 'Neve leve',
    1258: 'Neve moderada ou intensa',
    1261: 'Chuva de pelotas de gelo leve',
    1264: 'Chuva de pelotas de gelo moderada ou intensa',
    1273: 'Possibilidade de chuva leve com trovões',
    1276: 'Chuva moderada ou intensa com trovões',
    1279: 'Possibilidade de neve leve com trovões',
    1282: 'Neve moderada ou intensa com trovões'
}

const altera_section2 = (temperatura, icone_src, condicao_portugues, cidade, pais, sensacao_termica, umidade, vento) => {
    section2.innerHTML = `
    <div class="topDiv-section2">
                <h2>${temperatura}°C</h2>
                <img src="${icone_src}" id="data_icon" alt="icone clima"> 
            </div>
            <div class="midDiv-section2">
                <p class="p-status">${condicao_portugues}</p>
                <p class="p-localidade"><img src="images/local-icon.png" alt="icone de mapa"> ${cidade}, ${pais}</p>
            </div>
            <div class="bottomDiv-section2">
                <div class="infos-clima">
                    <p>Sensação térmica</p>
                    <div>
                        <p>${sensacao_termica}°C</p>
                        <img src="images/thermometer.svg" alt="ilustração Sensação da térmica">
                    </div>
                </div>
                <div class="infos-clima">
                    <p>Umidade do ar</p>
                    <div>
                        <p>${umidade}%</p>
                        <img src="images/humidity.svg" alt="ilustração Sensação da térmica">
                    </div>
                </div>
                <div class="infos-clima">
                    <p>velocidade dos ventos</p>
                    <div>
                        <p>${vento}Km/h</p>
                        <img src="images/wind.svg" alt="ilustração Sensação da térmica">
                    </div>
                </div>
            </div>
    `
}

const traduz_condicao_climatica = (condition_code, day) => {
    switch (condition_code){
        case 1000:
            const retorno = day == 1 ? [condicoes_meteorologicas_portuges[condition_code], "images/sol_forte.svg"] : [condicoes_meteorologicas_portuges[condition_code], "images/lua.svg"]
            return retorno;
            break;

        case 1003:
            const retorno2 = day == 1 ? [condicoes_meteorologicas_portuges[condition_code], "images/nuvens_sol.svg"] : [condicoes_meteorologicas_portuges[condition_code], "images/nuvens_lua.svg"]
            return retorno2;
            break;
            
        case 1009:
            const retorno3 = day == 1 ? [condicoes_meteorologicas_portuges[condition_code], "images/sol_nuvens.svg"] : [condicoes_meteorologicas_portuges[condition_code], "images/lua_nuvens.svg"]
            return retorno;
            break;

        case 1006:
            return [condicoes_meteorologicas_portuges[condition_code], "images/nuvem.svg"];
            break;

        default:
            return [condicoes_meteorologicas_portuges[condition_code]];
            break;
        
    } 
}

const faz_requisicao = (parametro_api) => axios.get(`${api.url}?key=${api.key}&q=${parametro_api}`)

input_cidade.addEventListener("keypress", async (e) => {
    if(e.key == "Enter"){
        input_cidade.blur()// tira o focus do input
        setTimeout(if(largura_tela <= 600) scroll(0, altura_tela), 62) // rola até o fim da tela
        faz_requisicao(input_cidade.value)
            .then((response) => {
                // verifica se tem o icone animado caso não retorna o icone estatico
                let icone = traduz_condicao_climatica(response.data.current.condition.code, response.data.current.is_day)[1] || response.data.current.condition.icon;
                // traduz a resposta da condição climatica para portugues
                let condicao_portugues = traduz_condicao_climatica(response.data.current.condition.code)[0];
                // atualiza a section2 utilizando a resposta da requisição
                altera_section2(response.data.current.temp_c, icone, condicao_portugues, response.data.location.name, response.data.location.country, response.data.current.feelslike_c, response.data.current.humidity, response.data.current.wind_kph)     
            })
            .catch((response) => {
                alert("Cidade não encontrada")
                section2.innerHTML = `<img src="images/raining-animate.svg" alt="ilustração mulher na chuva" id="image_mulher_chuva">`
            })
        
        // Loader enquanto a requisição não é carregada
        section2.innerHTML = `<span class="loader"></span>`
    }
})

button_ip.addEventListener("click", () => {
    section2.innerHTML = `<span class="loader"></span>` // coloca um loader na tela esperando a resposta

    if(largura_tela <= 600){
        scroll(0, altura_tela) // rola até o fim da tela
    }

    navigator.geolocation.getCurrentPosition((e) => {
        let latitude = e.coords.latitude
        let longitude = e.coords.longitude

        faz_requisicao(`${latitude},${longitude}`)
            .then((response_api) => {
                 // verifica se tem o icone animado caso não retorna o icone estatico
                let icone = traduz_condicao_climatica(response_api.data.current.condition.code, response_api.data.current.is_day)[1] || response_api.data.current.condition.icon;
                 // traduz a resposta da condição climatica para portugues
                let condicao_portugues = traduz_condicao_climatica(response_api.data.current.condition.code)[0];
                 // atualiza a section2 utilizando a resposta da requisição
                altera_section2(response_api.data.current.temp_c, icone, condicao_portugues, response_api.data.location.name, response_api.data.location.country, response_api.data.current.feelslike_c, response_api.data.current.humidity, response_api.data.current.wind_kph)                
            })
            .catch(() => {
                alert("Cidade não encontrada")
                section2.innerHTML = `<img src="images/raining-animate.svg" alt="ilustração mulher na chuva" id="image_mulher_chuva">`
            }
            )
    }, (error) => {
        if(error.code == 1){
            alert("Para usar a Localização por ip aceite usar sua localizção na página")
            section2.innerHTML = `<img src="images/raining-animate.svg" alt="ilustração mulher na chuva" id="image_mulher_chuva">`
        }
        else{
            alert("Seu navegador não tem suporte para essa função")
            section2.innerHTML = `<img src="images/raining-animate.svg" alt="ilustração mulher na chuva" id="image_mulher_chuva">`
        }
    })
})

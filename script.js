const api = {
    url:"https://api.weatherapi.com/v1/current.json",
    key:"154b47968a624563a5d230136230409",
}

const input_cidade = document.querySelector(".input-section1");
const button_ip = document.querySelector(".button-section1");

const section2 = document.getElementById("section-2");

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

const traduz_condicao_climatica = (condition_code, day) => {
    if(condition_code == 1000){
        if(day == 1){
            return [condicoes_meteorologicas_portuges[condition_code], "images/sol_forte.svg"]
        }
        else{
            return [condicoes_meteorologicas_portuges[condition_code], "images/lua.svg"]
        }
    }
    else if(condition_code == 1003){
        if(day == 1){
            return [condicoes_meteorologicas_portuges[condition_code], "images/sol_nuvens.svg"]
        }
        else{
            return [condicoes_meteorologicas_portuges[condition_code], "images/lua_nuvens.svg"]
        }
    }
    else if(condition_code == 1006){
        return [condicoes_meteorologicas_portuges[condition_code], "images/nuvem.svg"]
    }
    else if(condition_code == 1009){
        if(day == 1){
            return [condicoes_meteorologicas_portuges[condition_code], "images/nuvens_sol.svg"]
        }
        else{
            return [condicoes_meteorologicas_portuges[condition_code], "images/nuvens_lua.svg"]
        }
    }
    else if(condition_code == 1063){
        if(day == 1){
            return [condicoes_meteorologicas_portuges[condition_code], "images/chuva_sol.svg"]
        }
        else{
            return [condicoes_meteorologicas_portuges[condition_code], "images/chuva_lua.svg"]
        }
    }
    else if(condition_code ==  1255 || 1258){
        return [condicoes_meteorologicas_portuges[condition_code], "images/nevando.svg"]
    }
    else if(condition_code == 1087){
        return [condicoes_meteorologicas_portuges[condition_code], "images/relampagos.svg"]
    }
    else if(condition_code == 1240 || 1243 || 1246){
        return [condicoes_meteorologicas_portuges[condition_code], "images/chovendo.svg"]
    }
}

input_cidade.addEventListener("keypress", (e) => {
    if(e.key == "Enter"){
        axios.get(`${api.url}?key=${api.key}&q=${input_cidade.value}`)
            .then((response) => {
                let icone = traduz_condicao_climatica(response.data.current.condition.code, response.data.current.is_day)[1] || response.data.current.condition.icon;
                let condicao_portugues = traduz_condicao_climatica(response.data.current.condition.code)[0];
                
                section2.innerHTML = `
                <div class="topDiv-section2">
                <h2>${response.data.current.temp_c}°C</h2>
                <img src="${icone}" id="data_icon""> 
            </div>
            <div class="midDiv-section2">
                <p class="p-status">${condicao_portugues}</p>
                <p class="p-localidade"><img src="images/local-icon.png" alt="icone de mapa"> ${response.data.location.name}, ${response.data.location.country}</p>
            </div>
            <div class="bottomDiv-section2">
                <div class="infos-clima">
                    <p>Sensação térmica</p>
                    <div>
                        <p>${response.data.current.feelslike_c}°C</p>
                        <img src="images/thermometer.svg" alt="ilustração Sensação da térmica">
                    </div>
                </div>
                <div class="infos-clima">
                    <p>Umidade do ar</p>
                    <div>
                        <p>${response.data.current.humidity}%</p>
                        <img src="images/humidity.svg" alt="ilustração Sensação da térmica">
                    </div>
                </div>
                <div class="infos-clima">
                    <p>velocidade dos ventos</p>
                    <div>
                        <p>${response.data.current.wind_kph}Km/h</p>
                        <img src="images/wind.svg" alt="ilustração Sensação da térmica">
                    </div>
                </div>
            </div>
                `;
            
            console.log(response.data)
            console.log(response.data.current.condition)
            })
            .catch((response) => {
            console.log(response)
            })
        
        // Loader enquanto a requisição não é carregada
        section2.innerHTML = `<span class="loader"></span>`
    }
})
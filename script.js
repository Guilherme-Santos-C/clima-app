const img = document.querySelector("img");

axios.get("http://api.weatherapi.com/v1/current.json?key=154b47968a624563a5d230136230409&q=caucaia")
    .then((response) => {
        console.log(response.data)
        img.src = response.data.current.condition.icon;
    })
    .catch((response) => {
        console.log(response.data)
    })
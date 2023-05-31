const API_KEY = "5607fa01e57c356cfe4f4ecb56a312d2";

const inputValue = document.querySelector(".input_1");
const sehir_adi = document.querySelector(".sehir_ad");
const nem_orani = document.querySelector(".nem_orani");
const ruzgar_orani = document.querySelector(".ruzgar_orani");
const sicaklik = document.querySelector(".sicaklik");
const btnAra = document.querySelector(".btn");
const span_hava = document.querySelector(".img-resim span")
const icerik = document.querySelector(".icerik");
const genel = document.querySelector("#genel");

async function havadurumu(city){
    const veri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    try{
        const data = await fetch(veri);
        const response = await data.json();

        bilgiler(response)
        console.log(response.sys.country)
        durumResimleri(response)
        
        inputValue.value = "";
        inputValue.placeholder = "Şehir veya Ülke";
    }
    catch(error){
        inputValue.value = "";
        console.log(error)
        alert("Yanlış Şehir İsmi")
    }
}

function bilgiler(bir){
    console.log(bir)


    sehir_adi.innerHTML = `${bir.name} ${bir.sys.country}`;
    nem_orani.innerHTML = `${bir.main.humidity} %`;
    ruzgar_orani.innerHTML = `${bir.wind.speed} km/h`;
    let tamsayi = Math.round(bir.main.temp)
    sicaklik.innerHTML = `${tamsayi} &deg`;
}

btnAra.addEventListener("click", function(e){
    e.preventDefault()
    let city = inputValue.value;
    havadurumu(city)
})

function durumResimleri(deger){
    if(deger.weather[0].main === "Clouds"){
        span_hava.innerHTML = `<span class="material-symbols-outlined">
        partly_cloudy_day
        </span>`;
    }
    if(deger.weather[0].main === "Rain"){
        span_hava.innerHTML = `<span class="material-symbols-outlined">
        rainy
        </span>`
    }
    if(deger.weather[0].main === "Clouds"){
        span_hava.innerHTML = `<span class="material-symbols-outlined">
        cloudy
        </span>`
    }
    if(deger.weather[0].main === "Thunderstorm"){
        span_hava.innerHTML = `<span class="material-symbols-outlined">
        thunderstorm
        </span>`
    }
    if(deger.weather[0].main === "Mist"){
        span_hava.innerHTML = `<span class="material-symbols-outlined">
        mist
        </span>`
    }
    if(deger.weather[0].main === "Snow"){
        span_hava.innerHTML = `<span class="material-symbols-outlined">
        weather_snowy
        </span>`
    }
    if(deger.weather[0].main === "Clear"){
        span_hava.innerHTML = `<span class="material-symbols-outlined">
        clear_day
        </span>`
    }
    if(deger.weather[0].main === "Shower Rain"){
        span_hava.innerHTML = `<span class="material-symbols-outlined">
        weather_mix
        </span>`
    }
}

inputValue.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
    e.preventDefault();
    let city = inputValue.value;
    havadurumu(city)
    }
})

async function initialize() {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=istanbul&units=metric&appid=${API_KEY}`);
      const data = await response.json();
      bilgiler(data);
      durumResimleri(data);
    } catch (error) {
      console.log(error);
    }
  }

initialize();
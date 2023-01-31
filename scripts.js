
async function fetchHourlyWeather(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            console.log(data.hourly.time.length)
            for (let i = 0; i < data.hourly.time.length; i++) {
                console.log(`Time: ${data.hourly.time[i]}`)
                console.log(`Temperature: ${data.hourly.temperature_2m[i]}${data.hourly_units.temperature_2m}`)
                console.log(`Humidity: ${data.hourly.relativehumidity_2m[i]}${data.hourly_units.relativehumidity_2m}`)
                console.log(`Wind direction: ${data.hourly.winddirection_10m[i]}${data.hourly_units.winddirection_10m}`)
            }
        })
        .catch(error => console.error('Error:', error))
}



async function fetchDailyWeather(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let daily_html = "";
            for (let i = 0; i < data.daily.time.length; i++) {

                daily_html +=  `<div class="dailyWeatherCard">`
                daily_html += `<p>Day: ${data.daily.time[i]}</p>`
                daily_html += `<p>Temperature high: ${data.daily.temperature_2m_max[i]}${data.daily_units.temperature_2m_max}</p>`
                daily_html += `<p>Temperature low: ${data.daily.temperature_2m_min[i]}${data.daily_units.temperature_2m_min}</p>`
                daily_html += `<p>Wind speed: ${data.daily.windspeed_10m_max[i]}${data.daily_units.windspeed_10m_max}</p>`
                daily_html += `</div>`

                updateDailyWeather(daily_html);
            }


        })
        .catch(error => console.error('Error:', error))
}

async function fetchCurrentWeather(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)

            updateCurrentWeather(data.current_weather.temperature, data.current_weather.windspeed, data.current_weather.winddirection, data.current_weather.time)

        })
        .catch(error => console.error('Error:', error))
}

function updateCurrentWeather(temperature, windspead, winddirection, time) {
    const current_date = document.getElementById("current_date");
    const current_temp = document.getElementById("current_temp");
    const current_windspeed = document.getElementById("current_windspeed");
    const current_winddirection = document.getElementById("current_winddirection");
    let current_humidity;
    let current_conditions;


    current_date.innerHTML = `<p>Time: ${time}<p>`
    current_windspeed.innerHTML = `<p>Wind speed: ${windspead}<p>`
    current_winddirection.innerHTML = `<p>Wind direction: ${winddirection}<p>`
    current_temp.innerHTML = `<p>Temperature: ${temperature}<p>`
}

function updateDailyWeather(html) {
    const weekly_report = document.getElementById("weekly-report");

    weekly_report.innerHTML = html
}


document.addEventListener("DOMContentLoaded", (event) => {
    fetchCurrentWeather('https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=-104.62&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&current_weather=true&timezone=CST')


    fetchDailyWeather('https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=-104.62&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&current_weather=true&timezone=CST')


    //  fetchHourlyWeather('https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=-104.62&hourly=temperature_2m,relativehumidity_2m,winddirection_10m&timezone=CST');
});



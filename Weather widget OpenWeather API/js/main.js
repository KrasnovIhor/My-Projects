window.addEventListener("load", () => {
	const location = document.getElementById("location"),
		tempIcon = document.getElementById("tempIcon"),
		tempValue = document.getElementById("tempValue"),
		weatherDescr = document.getElementById("weatherDescr"),
		timeNowValue = document.getElementById("timeNow"),
		weatherTable = document.querySelector("table"),
		windValue = weatherTable.querySelector("#windValue"),
		cloudValue = weatherTable.querySelector("#cloudValue"),
		pressureValue = weatherTable.querySelector("#pressureValue"),
		humidityValue = weatherTable.querySelector("#humidityValue"),
		sunriseTime = weatherTable.querySelector("#sunriseTime"),
		sunsetTime = weatherTable.querySelector("#sunsetTime"),
		geoCoords = weatherTable.querySelector("#geoCoords"),
		weatherWeeklyContainer = document.querySelector(".weather__weekly"),
		firstDayHeader = document.getElementById("firstDate");

	let lat, long;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/",
				apiDaily = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=bc88c4a6993fb454b70fe075de19bb44`,
				apiWeekly = `${proxy}api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=bc88c4a6993fb454b70fe075de19bb44`;

			const weeklyForecast = () => {
				fetch(apiWeekly)
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						const { list: weatherArray } = data,
							todayDate = new Date();

						firstDayHeader.innerHTML = `${todayDate.toLocaleString("en", {
							weekday: "short",
						})} ${todayDate.toLocaleString("en", {
							month: "short",
						})} ${todayDate.getDate()} ${todayDate.getFullYear()} Today`;

						weatherArray.forEach((el) => {
							const { dt: timestamp } = el,
								timeHourly = `${new Date(timestamp * 1000).getHours()}:${new Date(
									timestamp * 1000
								).getMinutes()}`,
								{ icon, description: cloudiness } = el.weather[0],
								{ temp, humidity, pressure } = el.main,
								tempValue = (temp - 273).toFixed(1),
								{ speed: windSpeed } = el.wind,
								weeklyPerHourCont = document.createElement("div"),
								weatherHeader = document.createElement("div");

							let timeNow = new Date(timestamp * 1000);

							weatherHeader.classList.add("weather__header");
							weatherHeader.innerHTML = `
								<p class="weather__date">${timeNow.toLocaleString("en", {
									weekday: "short",
								})} ${timeNow.toLocaleString("en", {
								month: "short",
							})} ${timeNow.getDate()} ${timeNow.getFullYear()}</p>
							`;

							weeklyPerHourCont.classList.add("weekly__perhour");
							weeklyPerHourCont.innerHTML = `
								<div class="weekly__perhour-left">
									<p>${timeHourly}</p>
									<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
								</div>
								<div>
									<p><span>${tempValue}<span>&#176C</span></span><span>${cloudiness}</span></p>
									<p><span>${windSpeed} m/s</span><span>clouds: ${humidity}%</span><span>${pressure} hpa</span></p>
								</div>
							`;

							if (timeHourly === "0:0") {
								weatherWeeklyContainer.appendChild(weatherHeader);
								weatherWeeklyContainer.appendChild(weeklyPerHourCont);
							} else {
								weatherWeeklyContainer.appendChild(weeklyPerHourCont);
							}
							
						});
					});
			};

			weeklyForecast();

			const dailyForecast = () => {
				fetch(apiDaily)
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						const { name: locationName, dt: dateNow } = data,
							{ speed: windSpeed } = data.wind,
							{ temp, pressure, humidity } = data.main,
							{ sunrise, sunset } = data.sys,
							{ main: weather, description: cloudiness, icon } = data.weather[0],
							{ lat, lon } = data.coord;

						let sunriseHours = new Date(sunrise * 1000).getHours(),
							sunriseMinutes = new Date(sunrise * 1000).getMinutes(),
							sunsetHours = new Date(sunset * 1000).getHours(),
							sunsetMinutes = new Date(sunset * 1000).getMinutes(),
							timeNow = new Date(dateNow * 1000);

						location.innerHTML = `Weather in ${locationName}`;
						tempValue.innerHTML = `${Math.round(temp - 273)} &#176C`;
						weatherDescr.innerHTML = weather;
						timeNowValue.innerHTML =
							timeNow.getHours() +
							":" +
							timeNow.getMinutes() +
							" " +
							timeNow.toLocaleString("en", { month: "short" }) +
							" " +
							timeNow.getFullYear();
						tempIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
						windValue.innerHTML = windSpeed + " m/s";
						cloudValue.innerHTML = cloudiness[0].toUpperCase() + cloudiness.slice(1);
						pressureValue.innerHTML = pressure + " hpa";
						humidityValue.innerHTML = humidity + "%";
						sunriseTime.innerHTML = sunriseHours + ":" + sunriseMinutes;
						sunsetTime.innerHTML = sunsetHours + ":" + sunsetMinutes;
						geoCoords.innerHTML = "[" + lat.toFixed(1) + ", " + lon.toFixed(1) + "]";
					});
			};

			dailyForecast();

		});
	}
});

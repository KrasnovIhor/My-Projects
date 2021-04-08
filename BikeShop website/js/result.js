"use strict";

document.addEventListener("DOMContentLoaded", () => {
	const buttonResult = document.getElementById("getResults"),
		showResults = document.getElementById("showResults");

	buttonResult.addEventListener("click", () => {
		let results = JSON.parse(localStorage.getItem("orders"));

		for (let i = 0; i < results.length; i++) {
			const orderElement = results[i],
				resultDiv = document.createElement("div");

			for (let key in orderElement) {
				const p = document.createElement("p");
				p.innerHTML = `${key}: ${orderElement[key]}`;
				console.log(key);
				resultDiv.appendChild(p);
			}
			showResults.appendChild(resultDiv);
		}
	});
});

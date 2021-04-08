"use strict";

document.addEventListener("DOMContentLoaded", () => {
	// Declaring variables

	const bikes = [
			"Cruiser",
			"Brera Blue",
			"XDS RETRO ALLOY",
			"Cafe Racer",
			"Retro 5.6",
			"Liv BeLiv F 2021",
		],
		data = [],
		inputs = document.querySelectorAll("input"),
		selects = document.querySelectorAll("select"),
		cities = ["Odesa", "Kyiv", "Lviv", "Kharkiv", "Dnipro", "Kherson"],
		orderForm = document.getElementById("orderForm"),
		billingCitySelect = document.getElementById("region"),
		deliveryCitySelect = document.getElementById("deliveryRegion"),
		bikeSelect = document.getElementById("bikeList"),
		monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
		qntYears = 4,
		selectYear = document.getElementById("year"),
		selectMonth = document.getElementById("month"),
		selectDay = document.getElementById("day"),
		deliveryCheck = document.getElementById("deliveryCheck"),
		billingInputs = [].slice.call(
			document.querySelectorAll(".billing-address")
		),
		deliveryInputs = [].slice.call(
			document.querySelectorAll(".delivery-address")
		),
		paymentInput = document.getElementById("payment"),
		createAccCheck = document.getElementById("createAcc"),
		createPassInput = document.getElementById("createPassword"),
		confirmPassInput = document.getElementById("confirmPassword"),
		accountContainer = document.querySelector(".account-create");
	let currentYear = new Date().getFullYear(),
		addOptions = (inputSelect, array) => {
			for (let i = 0; i < array.length; i++) {
				const option = array[i],
					elem = document.createElement("option");

				elem.textContent = option;
				elem.value = option;
				inputSelect.appendChild(elem);
			}
		};

	//Adding data to options of <select>

	addOptions(billingCitySelect, cities);
	addOptions(deliveryCitySelect, cities);
	addOptions(bikeSelect, bikes);

	//Date input event

	for (let y = 0; y < qntYears; y++) {
		let yearElem = document.createElement("option");
		yearElem.value = currentYear;
		yearElem.textContent = currentYear;
		selectYear.appendChild(yearElem);
		currentYear--;
	}

	for (let m = 0; m < 12; m++) {
		let month = monthNames[m];
		let monthElem = document.createElement("option");
		monthElem.value = m;
		monthElem.textContent = month;
		selectMonth.appendChild(monthElem);
	}

	let d = new Date(),
		month = d.getMonth(),
		year = d.getFullYear(),
		day = d.getDate();

	selectYear.value = year;
	selectYear.addEventListener("change", AdjustDays);
	selectMonth.value = month;
	selectMonth.addEventListener("change", AdjustDays);

	AdjustDays();
	selectDay.value = day;

	function AdjustDays() {
		let year = selectYear.value,
			month = parseInt(selectMonth.value, 10) + 1;
		selectDay.innerHTML = "";

		//get the last day, so the number of days in that month
		let days = new Date(year, month, 0).getDate();

		//lets create the days of that month
		for (let d = 1; d <= days; d++) {
			var dayElem = document.createElement("option");
			dayElem.value = d;
			dayElem.textContent = d;
			selectDay.appendChild(dayElem);
		}
	}

	//Same address event

	deliveryCheck.addEventListener("click", () => {
		const deliveryInputsArray = [];

		billingInputs.map((i) => {
			deliveryInputsArray.push(i.value);
		});

		if (deliveryCheck.checked) {
			for (let index = 0; index < deliveryInputs.length; index++) {
				const element = deliveryInputs[index];

				element.value = deliveryInputsArray[index];
			}
		} else {
			deliveryInputs.forEach((i) => {
				i.value = "";
			});
		}
	});

	//Payment event

	paymentInput.addEventListener("change", () => {
		const paymentContainer = document.querySelector(".credit-card-container");
		if (paymentInput.value === "Credit Card") {
			paymentContainer.classList.remove("removed");
		} else {
			paymentContainer.classList.add("removed");
		}
	});

	//Create account event

	createAccCheck.addEventListener("click", () => {
		createAccCheck.checked
			? accountContainer.classList.remove("removed")
			: accountContainer.classList.add("removed");
	});

	//Submitting form

	orderForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const cardNumber = document.getElementById("cardNumber"),
			order = {
				id: Date.now(),
			},
			errorMessage = document.getElementById("cardErrorMessage");

		for (let i = 0; i < inputs.length || i < selects.length; i++) {
			const inputElement = inputs[i],
				inputElementId = inputElement.getAttribute("id");
			if (
				inputElementId !== "confirmPassword" &&
				inputElementId !== "submit-btn" &&
				inputElementId !== "createAcc"
			) {
				order[inputElementId] = inputElement.value;
			} else continue;

			order[inputElementId] = inputElement.value;
		}

		for (let s = 0; s < selects.length; s++) {
			const selectElement = selects[s],
				selectElementId = selectElement.getAttribute("id");

			order[selectElementId] = selectElement.value;
		}

		if (cardNumber.value.length === 0) {
			event.preventDefault();
			errorMessage.textContent = "Required";
		} else if (cardNumber.value.length !== 16) {
			event.preventDefault();
			errorMessage.textContent = "Invalid card number";
		} else {
			errorMessage.textContent = "";
		}
		if (confirmPassInput.value !== createPassInput.value) {
			event.preventDefault();
			alert("Passwords do not match");
		} else {
			data.push(order);
			console.log(data);

			localStorage.setItem("orders", JSON.stringify(data));
		}
	});
});

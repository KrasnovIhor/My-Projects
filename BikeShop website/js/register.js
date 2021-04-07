"use strict";

document.addEventListener("DOMContentLoaded", () => {
	const data = [],
		signInForm = document.querySelector("#signInForm"),
		password = document.querySelector("#password"),
		confirmPassword = document.querySelector("#confirm"),
		inputs = document.querySelectorAll("input");

	signInForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const user = {
			id: Date.now(),
		};

		for (let i = 0; i < inputs.length; i++) {
			const element = inputs[i],
				elementId = element.getAttribute("id");

			if (elementId !== "confirm" && elementId !== "submit-btn") {
				user[elementId] = element.value;
			} else continue;
		}

		if (confirmPassword.value !== password.value) {
			alert("Passwords do not match");
		} else {
			data.push(user);
			signInForm.reset();
			console.log(data);

			localStorage.setItem("Users", JSON.stringify(data));
		}
	});
});

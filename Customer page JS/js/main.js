document.addEventListener("DOMContentLoaded", () => {
	class User {
		constructor(firstname, lastName, firstBuy, nextBuy, payment) {
			this.name = {
				firstName: firstname,
				lastName: lastName,
			};
			this.firstBuy = firstBuy;
			this.nextBuy = nextBuy;
			this.payment = payment;
			this.discount = false;
		}

		isDiscount() {
			if (new Date(this.firstBuy) < Date.now()) {
				this.discount = true;
				this.newPrice = price - price * 0.05;
			}
		}
	}

	const data = [],
		price = 1000, //Add some price for testing
		firstBuy = document.getElementById("firstBuyDate"),
		nextBuy = document.getElementById("nextBuyDate"),
		firstName = document.getElementById("firstName"),
		lastName = document.getElementById("lastName"),
		payment = document.getElementById("payment"),
		discount = document.getElementById("discount"),
		customerForm = document.getElementById("customerForm");

	//Add discount option if date of first buy was before today.

	firstBuy.addEventListener("change", function () {
		const discountOption = discount.querySelector("option");
		if (discountOption) discountOption.remove();

		if (new Date(this.value) < Date.now()) {
			const option = document.createElement("option");

			option.value = "5% discount";
			option.textContent = "You have 5% discount!";
			discount.appendChild(option);
		}
	});

	customerForm.addEventListener("submit", (e) => {
		e.preventDefault();
		let user = new User(
			firstName.value,
			lastName.value,
			firstBuy.value,
			nextBuy.value,
			payment.value
		);

		user.isDiscount();
		console.log(user);

		data.push(user);
		console.log(data);
	});
});

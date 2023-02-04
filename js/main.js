CODE = "b4a63432b741bb9908df40fd71d6478e";
COUNTER = 0;
COUNTER_GIF = 1;
GIFS = ["doit", "nope", "noob", "laugh", "huh", "catJam", "sleep", "smoking", "yo", "rain", "doit"]

input = document.querySelector(".form__wrapper--input input");
first_input = document.querySelector(".form__wrapper--auto input");
button_slide = document.querySelector(".btn--bf");
TABS = [document.querySelector(".form__wrapper--input"), document.querySelector(".form__wrapper--auto")];
INTERVAL = null;

let toggleTypeInput = (input, type_=false) => {
	if (type_) {
		input.classList.add("bg-success");
		input.classList.remove("bg-danger");
	} else {
		input.classList.add("bg-danger");
		input.classList.remove("bg-success");
	}
}

let toggleTypeInputs = () => {
	inputs = document.querySelectorAll('.form__wrapper--auto input');
	inputs.forEach((input_) => {
		input_.classList.add("bg-success");
	});
}

let blockInput = (input) => {
	input.setAttribute("readonly", null)
}

let toggleGif = () => {
	target = document.querySelector(".form__bttv");
	target.classList.remove(`form__bttv--${GIFS[COUNTER_GIF - 1]}`);
	target.classList.add(`form__bttv--${GIFS[COUNTER_GIF]}`);
	if (GIFS.length <= COUNTER_GIF) COUNTER_GIF = 1;
	else COUNTER_GIF++;
}

let setWinGif = () => {
	target = document.querySelector(".form__bttv");
	target.classList.remove(`form__bttv--${GIFS[COUNTER_GIF - 1]}`);
	target.classList.add("form__bttv--clap")
}

let hidden = (obj) => {
	obj.classList.add("animate__animated", "animate__zoomOutDown")
	setTimeout(() => {
		obj.classList.add("hidden");
		obj.classList.remove("animate__animated", "animate__zoomOutDown")
	}, 1000)
}

let show = (obj) => {
	obj.classList.remove("hidden");
	obj.classList.add("animate__animated", "animate__zoomInDown")
	setTimeout(() => {
		obj.classList.remove("animate__animated", "animate__zoomInDown")
	}, 1000)
}

let startAutoSearch = (count) => {
	alph = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
	size = alph.length;
	counters = new Array(count).fill(0);
	inputs = document.querySelectorAll('.form__wrapper--auto input');
	inputs = Array.prototype.slice.call(inputs);
	INTERVAL = setInterval(() => {
		values = counters.map((elem) => alph[elem]);
		inputs.map((element) => {
			element.value = values[inputs.indexOf(element)];
		});
		value = values.join("").toLowerCase();
		if (md5(value) == CODE) {
			toggleTypeInputs(input, true);
			clearInterval(INTERVAL);
		}

		index = 0;
		counters[index]++;
		while (counters[index] == (size - 1)) {
			counters[index] = 0;
			index++;
			counters[index]++;
		}
	}, 1);

}

input.addEventListener("input", (event) => {
	value = event.target.value;
	COUNTER++;

	if (md5(value) == CODE) {
		toggleTypeInput(input, true);
		blockInput(input);
		setWinGif();
	} else toggleTypeInput(input)
	if (COUNTER % 50 == 0) {
		toggleGif();
	}
});

button_slide.addEventListener("click", (event) => {
	button_slide.classList.add("hidden");
	hidden(TABS[0])
	setTimeout(() => {
		show(TABS[1]);
		startAutoSearch(8);
	}, 1000)
});
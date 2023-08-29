document.addEventListener("DOMContentLoaded", () => {


	const screen = document.querySelector('.main_screen')
	const container = document.getElementById('container')
	
	let arr = []
	let mathSymbol = ''


	//math function
	function plus(num1, num2) {
		return Number(num1) + Number(num2);
	}

	function minus(num1, num2) {
		return Number(num1) - Number(num2);
	}

	function del(num1, num2) {
		const n1 = (Number(num1) / Number(num2)).toFixed(2)
		const n2 = Math.floor(Number(num1) / Number(num2))

		return (n1 - n2) > 0 ? n1 : n2;

	}

	function multiply(num1, num2) {
		const n1 = (Number(num1) * Number(num2)).toFixed(2)
		const n2 = Math.floor(Number(num1) * Number(num2))
		return (n1 - n2) > 0 ? n1 : n2;

	}

	function addNumberToScreen(num) {
		const str = screen.textContent
		if (str.length < 13) {
			screen.textContent += num;

		}

	}

	function clearScreen() {
		screen.textContent = '';
	}

	function operationSelection(num1 = 0, num2 = 0, str) {
		switch (str) {
			case '/':
				return del(num1, num2);
			case '*':
				return multiply(num1, num2);
			case '+':
				return plus(num1, num2);
			case '-':
				return minus(num1, num2);
			default:
				break;
		}
	}

	function fixResult(num) {

		let str = num.toString()
		let r = str.indexOf('.')

		if (num > 9999999999999) { //перевірка на максимальне число
			return 'Max number'
		}
		if (num < (-999999999999)) {//перевірка на мінімальне число
			return 'Min number'
		}
		if (str.length > 13) {	//обробка до потрібного знака після точки
			console.log(str.length);
			if (r != -1) {
				return num.toFixed(12 - r)
			}
		}
		return num

	}
	function resetCalc() {//повний зброс
		arr.length = 0
		mathSymbol = ''
		clearScreen()
	}

	function characterСheck(symbol) {
		return (symbol.length == 1 && valid(symbol))
	}

	function addToArr(sym) { //вставка чисел в основный масив
		if (sym) {
			arr.push(sym)
		} else {
			arr.push(0)
		}
	}


	//valid
	const validStr = /[\/*\-+]/

	function valid(str1) {   //перевірка рядка на потрібні символи
		return validStr.test(str1)
	}

	//Events
	
	container.addEventListener('click', function (e) {

		const target = e.target
		let number = target.textContent //поточне значення натисненого елементу
		let symbol = screen.textContent //поточне значення екрану



		if (target.classList.contains('button-number')) {
			if (!Number(symbol) && symbol.length > 3) clearScreen()
			if (valid(screen.textContent) && screen.textContent.length == 1) {//очищення поля ввода після додавання операції
				mathSymbol = screen.textContent
				clearScreen()
			}
			if (symbol == '0' && symbol.length == 1) { //перевірка на додавання 0
				clearScreen()
			}
			addNumberToScreen(number)  //додавання на екран
		}
		if (target.classList.contains('button-muth')) { //обробка клавіш математичних операцій
			if (!Number(symbol)) clearScreen() //зброс текстових значень
			
			mathSymbol = target.textContent

			if (!characterСheck(symbol)) {
				addToArr(symbol)

				if (arr.length == 2) {
					arr[0] = operationSelection(arr[0], arr[1], mathSymbol)
					arr.pop()
				}
			}

			clearScreen()
			addNumberToScreen(mathSymbol)

		}

		if (target.classList.contains('button-clear')) { //обробка клавіш зброс
			resetCalc()

		}

		if (target.classList.contains('button-del')) { //обробка клавіши видалити 1
			const str = screen.textContent.slice(0, -1)
			screen.textContent = str

		}

		if (target.classList.contains('button-sign')) { //обробка клавіши знаку числа
			let s = '-'
			if (symbol.indexOf('-') < 0 && !valid(symbol)) {

				screen.textContent = s + symbol
			} else if (characterСheck(symbol)) {

				mathSymbol = symbol
				clearScreen()
				screen.textContent = s
			} else {

				screen.textContent = symbol.slice(1)
			}

		}


		if (target.classList.contains('button-symbol')) { //обробка клавіши .

			if (symbol.indexOf('.') < 0 && symbol.length > 0) { //перевірка чи є . на екрані
				if (characterСheck(symbol)) { }	//перевірка чи це не математичний символ
				else {
					addNumberToScreen('.') //додавання . на екран
				}
			}


		}

		if (target.classList.contains('button-result')) { //обробка клавіш дорівнює
			let result = 0

			if (characterСheck(symbol)) { //перевірка чи це не математичний символ
				result = arr ? arr[0] : 0; //результат буде дорівнювати першому введеному числу або якщо його нема 0
			} else {
				addToArr(symbol) //якщо є перше число додаємо друге і виконуємо операції
				if (arr.length == 2) {
					result = operationSelection(arr[0], arr[1], mathSymbol)
				} else {
					result = arr[0]
				}
			}

			result = fixResult(result) //обробляємо результат до потрібного виду
			resetCalc() //зброс 
			addNumberToScreen(result) //виводимо наш результат
		}
	})




})



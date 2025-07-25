var transfer = 'Трансфер не нужен'
var nature = 'Поездка на природу не выбрана'

const urlLink =
	'https://api.telegram.org/bot8232845587:AAHkU_ohJrK-KnGYkMd-RBcLAPptqpWtd8k/sendMessage?chat_id=-4979567945&parse_mode=html&text='

let send = false
let clicked = false

document.querySelector('.submit').addEventListener('click', function () {
	if (send || clicked) return
	clicked = true

	// Получение значений полей
	const name = document.getElementById('name').value.trim()
	const secondName = document.getElementById('second-name').value.trim()

	const will = document.querySelector('.will')
	const notWill = document.querySelector('.notwill')

	const errorMessages = []
	const errorContainer = document.getElementById('error-messages')
	errorContainer.innerHTML = '' // Очищаем ошибки перед новой проверкой

	// Проверяем, выбран ли статус
	if (
		!will.classList.contains('selected') &&
		!notWill.classList.contains('selected')
	) {
		errorMessages.push('Выберите статус "БУДУ" или "НЕ СМОГУ".')
	}

	// Проверяем, заполнены ли все поля
	if (!name) errorMessages.push('Пожалуйста, введите ваше имя.')
	if (!secondName) errorMessages.push('Пожалуйста, введите вашу фамилию.')

	if (errorMessages.length > 0) {
		// Если есть ошибки, отображаем их
		errorMessages.forEach(msg => {
			const error = document.createElement('div')
			error.style.color = '#603517'
			error.textContent = msg
			errorContainer.appendChild(error)
		})
	} else {
		// Если ошибок нет, выполняем AJAX-запрос
		errorContainer.style.color = '#603517'
		errorContainer.textContent = 'Спасибо за ваш ответ'
		console.log('тут ajax')

		let str = `<b>Новый ответ на приглашение:</b>\n<b>Имя:</b> ${name}\n<b>Фамилия:</b> ${secondName} \n<b>${
			will.classList.contains('selected') ? 'Буду' : 'Не буду'
		}</b>`

		if (will.classList.contains('selected')) {
			str += `\n<b>${transfer}</b>`
			str += `\n<b>${nature}</b>`
		}

		send = true
		fetch(encodeURI(urlLink + str))
	}
	clicked = false
})

// Обработчик кнопки "Мне нужен трансфер"
document.querySelector('.transfer').addEventListener('click', function () {
	if (this.classList.contains('selected')) {
		this.classList.remove('selected')
		transfer = 'Трансфер не нужен'
	} else {
		this.classList.add('selected')
		transfer = 'Трансфер нужен'
	}
})

// Обработчик кнопки "Поеду на природу"
document.querySelector('.nature').addEventListener('click', function () {
	if (this.classList.contains('selected')) {
		this.classList.remove('selected')
		nature = 'Поездка на природу не выбрана'
	} else {
		this.classList.add('selected')
		nature = 'Поеду на природу'
	}
})

// Обработка выбора статуса
document.querySelector('.will').addEventListener('click', function () {
	this.classList.add('selected')
	document.querySelector('.notwill').classList.remove('selected')
})

document.querySelector('.notwill').addEventListener('click', function () {
	this.classList.add('selected')
	document.querySelector('.will').classList.remove('selected')
})

// Инициализация AOS
document.addEventListener('DOMContentLoaded', function () {
	AOS.init({
		duration: 1000,
		once: true,
	})
})

function startCountdown(targetDateStr) {
	const targetDate = new Date(targetDateStr).getTime()

	const countdown = () => {
		const now = new Date().getTime()
		const distance = targetDate - now

		if (distance < 0) {
			document.getElementById('countdown').innerHTML = '🎉 Событие началось!'
			clearInterval(timerInterval)
			return
		}

		const days = Math.floor(distance / (1000 * 60 * 60 * 24))
		const hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		)
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((distance % (1000 * 60)) / 1000)

		document.getElementById('days').textContent = String(days).padStart(2, '0')
		document.getElementById('hours').textContent = String(hours).padStart(
			2,
			'0'
		)
		document.getElementById('minutes').textContent = String(minutes).padStart(
			2,
			'0'
		)
		document.getElementById('seconds').textContent = String(seconds).padStart(
			2,
			'0'
		)
	}

	const timerInterval = setInterval(countdown, 1000)
	countdown() // запуск сразу
}

// Запуск таймера до 20 сентября 2025 года 12:00
document.addEventListener('DOMContentLoaded', () => {
	startCountdown('2025-09-20T13:30:00')
})

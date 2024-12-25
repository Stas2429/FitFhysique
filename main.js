const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");
const bmiBtn = document.getElementById("btn-bmi");
const btnCal = document.getElementById("btn-cal");
const resultDiv = document.getElementById("result2");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

ScrollReveal().reveal(".bmi__header", scrollRevealOption);
ScrollReveal().reveal(".bmi__input", { ...scrollRevealOption, delay: 300 });
ScrollReveal().reveal(".btn", { ...scrollRevealOption, delay: 600 });
ScrollReveal().reveal(".table1", { ...scrollRevealOption, delay: 900 });
ScrollReveal().reveal(".macro__container", { ...scrollRevealOption, delay: 1000 });

const swiper = new Swiper(".swiper", {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
    },
});

bmiBtn.addEventListener("click", () => {
    const height = parseInt(document.getElementById("height").value);
    const weight = parseInt(document.getElementById("weight").value);
    const result = document.getElementById("output");

    let heightStatus = false, weightStatus = false;

    if (!height || isNaN(height) || height <= 0) {
        document.getElementById("height_error").innerText = "Пожалуйста, введите корректный рост";
    } else {
        document.getElementById("height_error").innerText = "";
        heightStatus = true;
    }

    if (!weight || isNaN(weight) || weight <= 0) {
        document.getElementById("weight_error").innerText = "Пожалуйста, введите корректный вес";
    } else {
        document.getElementById("weight_error").innerText = "";
        weightStatus = true;
    }

    if (heightStatus && weightStatus) {
        const bmi = (weight / ((height * height) / 10000)).toFixed(2);
        if (bmi < 18.5) {
            result.innerText = `Недостаточный вес: ${bmi}`;
        } else if (bmi > 25) {
            result.innerText = `Избыточный вес: ${bmi}`;
        } else {
            result.innerText = `Норма: ${bmi}`;
        }
    } else {
        result.innerText = "";
    }
});

btnCal.addEventListener("click", () => {
    const gender = document.getElementById("gender-2").value;
    const age = parseInt(document.getElementById("age-2").value, 10);
    const weight = parseFloat(document.getElementById("weight-2").value);
    const height = parseFloat(document.getElementById("height-2").value);
    const activity = parseFloat(document.getElementById("activity-2").value);

    if (isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(activity)) {
        resultDiv.innerHTML = "<p class='error'>Пожалуйста, заполните все поля корректно.</p>";
        return;
    }

    let bmr;
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const dailyCalories = bmr * activity;
    resultDiv.innerHTML = `<p>Ваша суточная норма калорий: <strong>${dailyCalories.toFixed(2)}</strong> ккал.</p>`;
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex'; // Показываем модальное окно
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none'; // Скрываем модальное окно
    }
}

// Обработчик клика по фону
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal) => {
        if (event.target === modal.querySelector('.modal__background')) {
            closeModal(modal.id); // Закрываем модальное окно при клике на фон
        }
    });
};

function filterSchedule(activity) {
    const rows = document.querySelectorAll('#schedule__daytime tbody tr');
    const buttons = document.querySelectorAll('.schedule__button button');

    // Сбросить активное состояние всех кнопок
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Установить активное состояние для выбранной кнопки
    const activeButton = Array.from(buttons).find(button => button.textContent.trim() === activity || (activity === 'ALL' && button.textContent.trim() === 'ВСЕ'));
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Фильтрация расписания
    rows.forEach(row => {
        if (activity === 'ALL' || row.dataset.activity === activity) {
            row.style.display = ''; // Показываем строку
        } else {
            row.style.display = 'none'; // Скрываем строку
        }
    });
}
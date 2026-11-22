
const toast = document.getElementById("toast");

const newCareerButton = document.getElementById("newCareer");
const continueCareerButton = document.getElementById("continueCareer");

let toastTimeout;

// NOTIFICATIONS

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

// CAREER DATA

function getCareer() {
    try {
        return JSON.parse(localStorage.getItem("zunoCareer"));
    } catch {
        return null;
    }
}

const clubs = [
    "FC Barcelona",
    "Real Madrid",
    "Manchester City",
    "Arsenal",
    "Liverpool",
    "Bayern Munich",
    "Borussia Dortmund",
    "Inter Milan",
    "Paris Saint-Germain"
];

// CAREER CREATION SCREEN

function openCareerCreation() {
    let screen = document.getElementById("careerScreen");

    if (!screen) {
        screen = document.createElement("div");
        screen.id = "careerScreen";
        screen.className = "career-screen";

        screen.innerHTML = `
            <div class="career-panel">
                <button class="career-back" id="careerBack">
                    ← BACK TO MENU
                </button>

                <div class="career-heading">
                    <span class="section-kicker">YOUR STORY STARTS NOW</span>
                    <h2>CREATE YOUR <span>LEGACY.</span></h2>
                    <p>Build your manager profile and choose your first challenge.</p>
                </div>

                <form id="careerForm">

                    <div class="career-field">
                        <label for="managerName">MANAGER NAME</label>
                        <input
                            id="managerName"
                            type="text"
                            placeholder="Enter your name"
                            maxlength="24"
                            required
                        >
                    </div>

                    <div class="career-field">
                        <label for="managerNationality">NATIONALITY</label>
                        <input
                            id="managerNationality"
                            type="text"
                            placeholder="e.g. German"
                            maxlength="30"
                            value="German"
                            required
                        >
                    </div>

                    <div class="career-field">
                        <label for="clubSelect">CHOOSE YOUR CLUB</label>
                        <select id="clubSelect">
                            ${clubs.map(club =>
                                `<option value="${club}">${club}</option>`
                            ).join("")}
                        </select>
                    </div>

                    <div class="career-field">
                        <label for="difficultySelect">DIFFICULTY</label>
                        <select id="difficultySelect">
                            <option value="Beginner">Beginner</option>
                            <option value="Professional" selected>Professional</option>
                            <option value="World Class">World Class</option>
                            <option value="Legendary">Legendary</option>
                        </select>
                    </div>

                    <div class="career-season">
                        <span>STARTING SEASON</span>
                        <strong>2026 / 27</strong>
                    </div>

                    <button class="primary-button career-submit" type="submit">
                        <span>START YOUR CAREER</span>
                        <span class="button-arrow">↗</span>
                    </button>

                </form>
            </div>
        `;

        document.body.appendChild(screen);

        document.getElementById("careerBack").addEventListener("click", () => {
            screen.classList.remove("visible");
        });

        document.getElementById("careerForm").addEventListener("submit", (event) => {
            event.preventDefault();

            const existingCareer = getCareer();

            if (existingCareer) {
                const overwrite = confirm(
                    "You already have a career. Do you want to replace it?"
                );

                if (!overwrite) return;
            }

            const career = {
                manager: document.getElementById("managerName").value.trim(),
                nationality: document.getElementById("managerNationality").value.trim(),
                club: document.getElementById("clubSelect").value,
                difficulty: document.getElementById("difficultySelect").value,
                season: "2026/27",
                created: new Date().toISOString()
            };

            if (!career.manager || !career.nationality) {
                showToast("PLEASE COMPLETE ALL FIELDS");
                return;
            }

            localStorage.setItem("zunoCareer", JSON.stringify(career));

            screen.classList.remove("visible");

            showToast(`CAREER CREATED · ${career.club.toUpperCase()} ⚽`);

            continueCareerButton.style.opacity = "1";
        });
    }

    screen.classList.add("visible");
}

// CONTINUE CAREER

function continueCareer() {
    const career = getCareer();

    if (!career) {
        showToast("NO CAREER FOUND. START A NEW ONE!");
        return;
    }

    showToast(`WELCOME BACK, ${career.manager.toUpperCase()}!`);
}

// BUTTONS

newCareerButton.addEventListener("click", openCareerCreation);
continueCareerButton.addEventListener("click", continueCareer);

// CLUB DETAILS

document.getElementById("clubDetails").addEventListener("click", () => {
    showToast("FC BARCELONA · CLUB PROFILE COMING SOON");
});

document.getElementById("clubNav").addEventListener("click", (event) => {
    event.preventDefault();

    document.querySelector(".club-section").scrollIntoView({
        behavior: "smooth"
    });
});

// QUICK MENU

document.getElementById("squadCard").addEventListener("click", () => {
    showToast("SQUAD MANAGEMENT · COMING SOON");
});

document.getElementById("transfersCard").addEventListener("click", () => {
    showToast("TRANSFER MARKET · COMING SOON");
});

function openSettings() {
    showToast("SETTINGS · COMING SOON");
}

document.getElementById("settingsNav").addEventListener("click", (event) => {
    event.preventDefault();
    openSettings();
});

document.getElementById("settingsCard").addEventListener("click", openSettings);

// INITIALIZATION

function initialize() {
    const career = getCareer();

    continueCareerButton.style.opacity = career ? "1" : "0.65";

    console.log("ZUNO FC initialized.");
    console.log("Prototype version: 0.2");
}

initialize();

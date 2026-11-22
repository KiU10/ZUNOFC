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

// PAGE NAVIGATION

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    document.getElementById(pageId).classList.add("active-page");

    document.querySelectorAll(".top-nav a").forEach(link => {
        link.classList.remove("active");
    });

    const navLinks = {
        homePage: "homeNav",
        dashboardPage: "homeNav",
        clubPage: "clubNav"
    };

    const activeLink = document.getElementById(navLinks[pageId]);

    if (activeLink) {
        activeLink.classList.add("active");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// DASHBOARD

function openDashboard() {
    const career = getCareer();

    if (!career) {
        showToast("NO CAREER FOUND. START A NEW ONE!");
        return;
    }

    document.getElementById("dashboardManager").textContent =
        career.manager.toUpperCase();

    document.getElementById("dashboardClub").textContent =
        career.club;

    document.getElementById("dashboardDifficulty").textContent =
        `${career.difficulty} difficulty · ${career.season}`;

    document.getElementById("clubName").textContent =
        career.club;

    showPage("dashboardPage");
}

// CAREER CREATION

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

        document.getElementById("careerForm").addEventListener("submit", event => {
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

            openDashboard();
            showToast(`CAREER CREATED · ${career.club.toUpperCase()} ⚽`);
        });
    }

    screen.classList.add("visible");
}

// BUTTONS

newCareerButton.addEventListener("click", openCareerCreation);
continueCareerButton.addEventListener("click", openDashboard);

// NAVIGATION

document.getElementById("homeNav").addEventListener("click", event => {
    event.preventDefault();

    if (getCareer()) {
        openDashboard();
    } else {
        showPage("homePage");
    }
});

document.getElementById("clubNav").addEventListener("click", event => {
    event.preventDefault();
    showPage("clubPage");
});

document.getElementById("settingsNav").addEventListener("click", event => {
    event.preventDefault();
    showToast("SETTINGS · COMING SOON");
});

// DASHBOARD BUTTONS

document.getElementById("dashboardClubButton").addEventListener("click", () => {
    showPage("clubPage");
});

document.getElementById("dashboardSquad").addEventListener("click", () => {
    showToast("SQUAD MANAGEMENT · COMING SOON");
});

document.getElementById("dashboardTransfers").addEventListener("click", () => {
    showToast("TRANSFER MARKET · COMING SOON");
});

// CLUB

document.getElementById("clubDetails").addEventListener("click", () => {
    showToast("CLUB DETAILS · COMING SOON");
});

// INITIALIZATION

function initialize() {
    const career = getCareer();

    continueCareerButton.style.opacity = career ? "1" : "0.65";

    if (career) {
        openDashboard();
    } else {
        showPage("homePage");
    }

    console.log("ZUNO FC initialized.");
    console.log("Prototype version: 0.3");
}

initialize();

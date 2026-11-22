
const toast = document.getElementById("toast");

const newCareerButton = document.getElementById("newCareer");
const continueCareerButton = document.getElementById("continueCareer");

let toastTimeout;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

// CAREER SYSTEM

function getCareer() {
    try {
        return JSON.parse(localStorage.getItem("zunoCareer"));
    } catch {
        return null;
    }
}

function startCareer() {
    const existingCareer = getCareer();

    if (existingCareer) {
        const overwrite = confirm(
            "Du hast bereits eine Karriere. Möchtest du eine neue starten?"
        );

        if (!overwrite) return;
    }

    const career = {
        club: "FC Barcelona",
        season: 2026,
        manager: "Manager",
        created: new Date().toISOString()
    };

    localStorage.setItem("zunoCareer", JSON.stringify(career));

    showToast("YOUR BARCELONA CAREER HAS BEGUN! ⚽");
}

function continueCareer() {
    const career = getCareer();

    if (!career) {
        showToast("NO CAREER FOUND. START A NEW ONE!");
        return;
    }

    showToast(
        `WELCOME BACK! ${career.club} · SEASON ${career.season}`
    );
}

// BUTTONS

newCareerButton.addEventListener("click", startCareer);

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

    if (career) {
        continueCareerButton.style.opacity = "1";
    } else {
        continueCareerButton.style.opacity = "0.65";
    }

    console.log("ZUNO FC initialized.");
    console.log("Active club: FC Barcelona");
    console.log("Prototype version: 0.1");
}

initialize();

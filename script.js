// ============================
// DOM Element References
// ============================
const lengthInput = document.getElementById("length");
const passwordOutput = document.getElementById("password");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy-password");
const terminalBody = document.querySelector(".terminal-body");

const checkboxes = {
    uppercase: document.getElementById("chk-uppercase"),
    lowercase: document.getElementById("chk-lowercase"),
    numbers: document.getElementById("chk-numbers"),
    symbols: document.getElementById("chk-symbols"),
};

// ============================
// Character Sets
// ============================
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%&*()_-[]{}¦;:,.<>?";

// ============================
// Boot Sequence Logic
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const bootMessages = [
        "Password Generator-OS v1.0",
        "Loading Mi6 Encryption...",
        "Calling Devine Randomness...",
        "Applying cryptographic functions...",
        "Ready for input.",
    ];

    const bootOutput = document.getElementById("boot-sequence");
    const generatorUI = document.getElementById("generator-container");

    function typeBootText(index = 0) {
        if (index < bootMessages.length) {
            bootOutput.innerHTML += `${bootMessages[index]}<br>`;
            setTimeout(() => typeBootText(index + 1), 600);
        } else {
            setTimeout(() => {
                bootOutput.style.display = "none";
                generatorUI.style.display = "block";
                initExtras();
            }, 800);
        }
    }

    typeBootText();
});

// ============================
// Checkbox Toggle Logic
// ============================
Object.values(checkboxes).forEach(checkbox => {
    checkbox.addEventListener("click", () => {
        const checked = checkbox.getAttribute("data-checked") === "true";
        checkbox.setAttribute("data-checked", !checked);
        checkbox.textContent = checked ? "[ ]" : "[X]";
        checkbox.setAttribute("aria-checked", String(!checked));
    });
});

// ============================
// Password Generator
// ============================
function generatePassword(length = parseInt(lengthInput.value)) {
    let charPool = "";
    if (checkboxes.uppercase.dataset.checked === "true") charPool += uppercaseChars;
    if (checkboxes.lowercase.dataset.checked === "true") charPool += lowercaseChars;
    if (checkboxes.numbers.dataset.checked === "true") charPool += numberChars;
    if (checkboxes.symbols.dataset.checked === "true") charPool += symbolChars;

    if (!charPool) {
        alert("⚠ Please select at least one character type!");
        return "";
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charPool[Math.floor(Math.random() * charPool.length)];
    }

    animatePasswordReveal(password, passwordOutput);
    return password;
}

// ============================
// Password Reveal Animation
// ============================
function animatePasswordReveal(password, outputElement) {
    outputElement.value = "";
    let i = 0;

    function revealNext() {
        if (i < password.length) {
            outputElement.value = password.substring(0, i + 1) + "█";
            i++;
            setTimeout(revealNext, 50);
        } else {
            outputElement.value = password;
        }
    }

    revealNext();
}

// ============================
// Strength Calculation
// ============================
function calculateStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = ["░ ░ ░", "█ ░ ░", "█ █ ░", "█ █ █"];
    return levels[Math.min(score, levels.length - 1)];
}

// ============================
// Copy to Clipboard
// ============================
copyButton.addEventListener("click", () => {
    if (passwordOutput.value) {
        navigator.clipboard.writeText(passwordOutput.value).then(() => {
            showCopyMessage();
        });
    }
});

passwordOutput.addEventListener("click", () => {
    if (passwordOutput.value) {
        navigator.clipboard.writeText(passwordOutput.value).then(() => {
            showCopyMessage();
        });
    }
});

function showCopyMessage() {
    const msg = document.getElementById("copy-message");
    msg.classList.add("show");
    setTimeout(() => msg.classList.remove("show"), 1500);
}

// ============================
// CLI Command Interface
// ============================
const cliContainer = document.createElement("div");
cliContainer.id = "cli-container";
cliContainer.innerHTML = `
    <div id="cli-output"></div>
    <div id="cli-input-line">
        <span class="cli-prefix">&gt;</span>
        <input type="text" id="cli-input" autofocus />
    </div>
`;
terminalBody.appendChild(cliContainer);

const cliInput = document.getElementById("cli-input");
const cliOutput = document.getElementById("cli-output");

cliInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const command = sanitizeInput(cliInput.value.trim());
        executeCommand(command);
        cliInput.value = "";
    }
});

function appendOutput(text) {
    const line = document.createElement("div");
    line.innerHTML = text;
    cliOutput.appendChild(line);
    cliOutput.scrollTop = cliOutput.scrollHeight;
}

function sanitizeInput(input) {
    const div = document.createElement("div");
    div.innerText = input;
    return div.innerHTML;
}

function executeCommand(command) {
    appendOutput(`> ${command}`);
    const [cmd, arg] = command.toLowerCase().split(" ");

    switch (cmd) {
        case "generate":
            const len = parseInt(arg);
            if (!isNaN(len) && len >= 4 && len <= 20) {
                const pwd = generatePassword(len);
                animatePasswordReveal(pwd, cliOutput);
            } else {
                appendOutput("⚠ Invalid length. Use: generate <4-20>");
            }
            break;
        case "clear":
            cliOutput.innerHTML = "";
            break;
        case "help":
            appendOutput("Commands:");
            appendOutput("- generate <length>");
            appendOutput("- clear");
            appendOutput("- help");
            break;
        default:
            appendOutput("⚠ Unknown command. Type 'help' for options.");
    }
}

// ============================
// Initialization Helpers
// ============================
function initExtras() {
    // Strength Indicator
    const indicator = document.getElementById("strength-indicator");
    if (!indicator) {
        const el = document.createElement("div");
        el.id = "strength-indicator";
        document.querySelector(".password-output").appendChild(el);
    }

    // Preset Length Buttons
    const presets = [8, 12, 16, 32];
    const container = document.createElement("div");
    container.id = "preset-buttons";
    container.innerHTML = "<p>Quick Lengths:</p>";

    presets.forEach(len => {
        const btn = document.createElement("button");
        btn.className = "preset-btn";
        btn.textContent = len;
        btn.addEventListener("click", () => {
            lengthInput.value = len;
            generateButton.click();
        });
        container.appendChild(btn);
    });

    document.querySelector(".password-controls").appendChild(container);

    // Info Section
    const info = document.createElement("div");
    info.id = "info-section";
    info.innerHTML = `
        <div class="terminal-frame">
            <p class="terminal-text"><strong>Why Strong Passwords Matter</strong></p>
            <ul>
                <li>Use at least 12–16 characters</li>
                <li>Include upper/lowercase, numbers, symbols</li>
                <li>Avoid common words/phrases</li>
            </ul>
            <p class="terminal-text"><strong>Best Practices</strong></p>
            <ul>
                <li>Use unique passwords</li>
                <li>Enable 2FA</li>
                <li>Use a password manager</li>
            </ul>
            <p class="terminal-text"><strong>Using This Tool</strong></p>
            <ul>
                <li>Use CLI or buttons to generate</li>
                <li>Check strength before use</li>
                <li>Click to copy</li>
            </ul>
        </div>
    `;
    document.body.appendChild(info);
}

// ============================
// Final Bindings
// ============================
generateButton.addEventListener("click", () => {
    const password = generatePassword();
    document.getElementById("strength-indicator").textContent = `Strength: ${calculateStrength(password)}`;
});


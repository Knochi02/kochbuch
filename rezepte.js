document.addEventListener("DOMContentLoaded", function () {
    const portionenInput = document.getElementById("portionen");
    const form = portionenInput.closest("form");
    const originalValues = new Map();
    
    // Speichert die ursprünglichen Werte aus der HTML-Struktur
    document.querySelectorAll("[data-weight], [data-volume], [data-count]").forEach((el) => {
        originalValues.set(el, parseFloat(el.textContent.trim()) || 0);
    });
    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Verhindert das Neuladen der Seite
        const portionen = parseInt(portionenInput.value) || 1;
        const defaultPortionen = parseInt(portionenInput.getAttribute("value")) || 4; // Standardwert aus HTML übernehmen
        
        document.querySelectorAll("[data-weight], [data-volume], [data-count]").forEach((el) => {
            const originalValue = originalValues.get(el);
            const newValue = (originalValue * portionen) / defaultPortionen;
            el.textContent = Number.isInteger(newValue) ? newValue : parseFloat(newValue.toFixed(2)).toString(); // Entfernt unnötige Null
        });
    });
});

// Kochmodus aktivieren/deaktivieren
let wakeLock = null;

async function enableKochmodus() {
    try {
        wakeLock = await navigator.wakeLock.request("screen");
        document.getElementById("kochmodusToggle").classList.add("active");
    } catch (err) {
        console.error("Fehler beim Aktivieren des Kochmodus:", err);
    }
}

async function disableKochmodus() {
    if (wakeLock) {
        await wakeLock.release();
        wakeLock = null;
        document.getElementById("kochmodusToggle").classList.remove("active");
    }
}

function toggleKochmodus() {
    if (wakeLock) {
        disableKochmodus();
    } else {
        enableKochmodus();
    }
}

// Event Listener für Sichtbarkeitsänderungen
// Falls der Wake Lock unterbrochen wird, erneut aktivieren
document.addEventListener("visibilitychange", async () => {
    if (wakeLock !== null && document.visibilityState === "visible") {
        await enableKochmodus();
    }
});


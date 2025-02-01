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

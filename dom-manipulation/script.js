// script.js

// Load quotes from localStorage or initialize an empty array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
let lastViewedQuote = sessionStorage.getItem("lastViewedQuote") || "";

document.addEventListener("DOMContentLoaded", function () {
    loadQuotes();
    if (lastViewedQuote) {
        document.getElementById("quoteDisplay").textContent = lastViewedQuote;
    }
});

function addQuote() {
    const quoteInput = document.getElementById("quoteInput").value.trim();
    const categoryInput = document.getElementById("categoryInput").value.trim();
    if (quoteInput && categoryInput) {
        quotes.push({ text: quoteInput, category: categoryInput });
        saveQuotes();
        displayQuote(quoteInput, categoryInput);
        document.getElementById("quoteInput").value = "";
        document.getElementById("categoryInput").value = "";
    }
}

function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
    const quotesList = document.getElementById("quotesList");
    quotesList.innerHTML = "";
    quotes.forEach((quote, index) => {
        let li = document.createElement("li");
        li.textContent = `${quote.text} (${quote.category})`;
        li.onclick = () => displayQuote(quote.text, quote.category);
        quotesList.appendChild(li);
    });
}

function displayQuote(quote, category) {
    document.getElementById("quoteDisplay").textContent = `${quote} (${category})`;
    sessionStorage.setItem("lastViewedQuote", `${quote} (${category})`);
}

function exportToJsonFile() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "quotes.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                loadQuotes();
                alert("Quotes imported successfully!");
            } else {
                alert("Invalid JSON format");
            }
        } catch (error) {
            alert("Error parsing JSON file");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Attach event listeners
document.getElementById("exportButton").addEventListener("click", exportToJsonFile);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

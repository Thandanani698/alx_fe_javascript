document.addEventListener("DOMContentLoaded", function () {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  const exportBtn = document.getElementById("exportBtn");
  const importFileInput = document.getElementById("importFile");

  let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
    { text: "Happiness depends upon ourselves.", category: "Happiness" }
  ];

  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.innerHTML = "<em>No quotes available. Add a new one!</em>";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.innerHTML = `<p>\"${randomQuote.text}\"</p><strong>- ${randomQuote.category}</strong>`;
    
    sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote)); // Store last viewed quote
  }

  function addQuote() {
    const inputQuote = document.getElementById("newQuoteText");
    const inputCategory = document.getElementById("newQuoteCategory");

    const quoteText = inputQuote.value.trim();
    const quoteCategory = inputCategory.value.trim();

    if (quoteText === "" || quoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }

    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes();
    inputQuote.value = "";
    inputCategory.value = "";
    alert("Quote added successfully!");
  }

  function exportToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          alert("Quotes imported successfully!");
        } else {
          alert("Invalid file format!");
        }
      } catch (error) {
        alert("Error reading file!");
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }

  function loadLastViewedQuote() {
    const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
    if (lastQuote) {
      quoteDisplay.innerHTML = `<p>\"${lastQuote.text}\"</p><strong>- ${lastQuote.category}</strong>`;
    }
  }

  newQuoteButton.addEventListener("click", showRandomQuote);
  exportBtn.addEventListener("click", exportToJson);
  importFileInput.addEventListener("change", importFromJsonFile);

  loadLastViewedQuote();
  showRandomQuote();
});

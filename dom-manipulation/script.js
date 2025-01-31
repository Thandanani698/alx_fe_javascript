document.addEventListener("DOMContentLoaded", function () {
  const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
    { text: "Happiness depends upon ourselves.", category: "Happiness" }
  ];

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  const addQuoteButton = document.getElementById("addQuoteBtn");
  const inputQuote = document.getElementById("newQuoteText");
  const inputCategory = document.getElementById("newQuoteCategory");

  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.innerHTML = "<em>No quotes available. Add a new one!</em>";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><strong>- ${randomQuote.category}</strong>`;
  }

  newQuoteButton.addEventListener("click", showRandomQuote);

  function addQuote() {
    const quoteText = inputQuote.value.trim();
    const quoteCategory = inputCategory.value.trim();
    
    if (quoteText === "" || quoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }
    
    quotes.push({ text: quoteText, category: quoteCategory });
    inputQuote.value = "";
    inputCategory.value = "";
    alert("Quote added successfully!");
  }

  addQuoteButton.addEventListener("click", addQuote);
  showRandomQuote();
});

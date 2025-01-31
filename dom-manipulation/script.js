document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
      { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
      { text: "Happiness depends upon ourselves.", category: "Happiness" }
    ];
  
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteButton = document.getElementById("newQuote");
  
    function showRandomQuote() {
      if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available. Add a new one!";
        return;
      }
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
      quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
    }
  
    newQuoteButton.addEventListener("click", showRandomQuote);
  
    function addQuote() {
      const quoteText = document.getElementById("newQuoteText").value.trim();
      const quoteCategory = document.getElementById("newQuoteCategory").value.trim();
      
      if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
      }
      
      quotes.push({ text: quoteText, category: quoteCategory });
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
      alert("Quote added successfully!");
    }
  
    // Creating the quote addition form dynamically
    function createAddQuoteForm() {
      const formDiv = document.createElement("div");
  
      const inputQuote = document.createElement("input");
      inputQuote.id = "newQuoteText";
      inputQuote.type = "text";
      inputQuote.placeholder = "Enter a new quote";
      
      const inputCategory = document.createElement("input");
      inputCategory.id = "newQuoteCategory";
      inputCategory.type = "text";
      inputCategory.placeholder = "Enter quote category";
      
      const addButton = document.createElement("button");
      addButton.textContent = "Add Quote";
      addButton.addEventListener("click", addQuote);
  
      formDiv.appendChild(inputQuote);
      formDiv.appendChild(inputCategory);
      formDiv.appendChild(addButton);
  
      document.body.appendChild(formDiv);
    }
  
    createAddQuoteForm();
    showRandomQuote();
  });
  
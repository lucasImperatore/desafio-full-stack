const form = document.getElementById("bookForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const book_name = document.getElementById("book_name").value;
  const author_name = document.getElementById("author_name").value;
  const ean = document.getElementById("ean").value;
  const score = document
    .getElementById("scoreValue")
    .querySelector("input").value;
  const statsElement = document.querySelector('input[name="stats"]:checked');
  const stats = statsElement ? statsElement.value : "Lendo";

  if (book_name && author_name && book_name !="" && author_name !="") {
    await fetch("/arquive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        book_name,
        author_name,
        ean,
        score,
        stats,
      }),
    });
  } else {
    alert("Preencha os campos Nome e Autor")
  }
  form.reset(); // limpa os campos com a função nativa para tags form
});


function goBack(){
   const book_name = document.getElementById("book_name").value;
    const author_name = document.getElementById("author_name").value;
  if(author_name == "" && book_name ==""){
     alert("Preencha os campos Nome e Autor")
    
  }else{
   window.location.href = "index.html"; // Volta para a página principal
  }

      
};

function goHome() {
  window.location.href = "index.html";
}



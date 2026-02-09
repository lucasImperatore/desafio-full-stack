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

  if (book_name && author_name) {
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
  }
  form.reset(); // limpa os campos com a função nativa para tags form
});


function goBack(){
  if (response.ok) {
    alert("Livro cadastrado!");
    window.location.href = "index.html"; // Volta para a página principal
  } else {
    alert("Erro ao cadastrar livro.");
  }


}
// Se o servidor respondeu com sucesso (status entre 200-299)

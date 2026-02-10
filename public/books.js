let url = `http://localhost:3000/arquive`;
const bookList= document.getElementById("bookList");

async function loadBooks() {
  
  if (bookList) {
    bookList.innerHTML = "";
  } else {
    console.error("Element 'bookList' not found.");
    return;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error on requisition: ${response.statusText}`);
    }

    const books = await response.json();
    
    books.forEach((Id) => {
     
      const listItem = document.createElement("li");

      listItem.innerHTML = `
                <div>
                    <strong>Nome:</strong> ${Id.book_name || "N/A"}
                </div>
                <div>
                    <strong>Autor:</strong> ${Id.author_name || "N/A"}
                </div>
                <div>
                    <strong>EAN:</strong> ${Id.ean || "N/A"}
                </div>
                <div>
                    <strong>Nota:</strong> ${Id.score || "Aguardando Avaliação"}
                </div>
                <div>
                    <strong>Status:</strong> ${Id.stats || "Lendo"}
                </div>
                <button class="btn-delete" style="margin-top: 10px;">Deletar Livro</button>
                <button class="btn-update" style="margin-top: 10px;">Atualizar</button>
                <hr>
            `;
            const deleteBtn = listItem.querySelector(".btn-delete");
            deleteBtn.onclick = async () => {
                if (confirm(`Deletar livro: ${Id.book_name}?`)) {
                await executarDelete(Id.id);
        }};

        const updateBtn = listItem.querySelector(".btn-update");
    updateBtn.onclick = async () => {
    const novaNota = prompt("Insira a nova nota:", Id.score);
    const novoStatus = prompt("Insira o novo status (Ex: Lido, Lendo, Abandonado):", Id.stats);

    if (novaNota !== null && novoStatus !== null) {
        await executarUpdate(Id.id, novaNota, novoStatus);
    }
};

      
      bookList.appendChild(listItem);
    });
  } catch (error) {
    
    console.error("desculpe derrubamos seus livros:", error);

    bookList.innerHTML = `<li>Erro ao carregar os dados. Detalhes: ${error.message}</li>`;
  }
}

async function executarDelete(id) {
  try {
    const response = await fetch(`http://localhost:3000/arquive/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    alert(result.message);


    loadBooks(); 
  } catch (error) {
    alert("Erro ao conectar com o servidor.");
  }
}
async function executarUpdate(id, nota, status) {
    try {
        const response = await fetch(`http://localhost:3000/arquive/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json" // OBRIGATÓRIO para enviar JSON
            },
            body: JSON.stringify({
                score: nota,
                stats: status
            })
        });

        // Verificação de segurança antes de tentar ler o JSON
        if (!response.ok) {
            const errorText = await response.text(); // Lê como texto se der erro
            throw new Error(`Erro no servidor (${response.status}): ${errorText}`);
        }

        const result = await response.json();
        alert(result.message);
        loadBooks();
    } catch (error) {
        console.error("Erro ao atualizar:", error);
    }
}

loadBooks();
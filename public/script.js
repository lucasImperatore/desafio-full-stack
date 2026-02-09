fetch("/books")
      .then(res => res.json())
      .then(data => {
        const list = document.getElementById("bookList");

        data.forEach(book => {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong>${book.book_name}</strong> - ${book.author_name}<br>
            Nota: ${book.score} | Status: ${book.stats}
          `;
          list.appendChild(li);
        });
      });
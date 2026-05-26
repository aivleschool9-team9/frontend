import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BookListPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        도서 목록
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              display: "flex",
              gap: "24px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "140px",
                height: "180px",
                backgroundColor: "#f1f1f1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#888",
                borderRadius: "8px",
                flexShrink: 0,
              }}
            >
              no image
            </div>

            <div>
              <h2>{book.title}</h2>

              <p>저자: {book.author}</p>

              <p>{book.description}</p>

              <Link to={`/books/${book.id}`}>
                <button
                  style={{
                    marginTop: "12px",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: "#1f2937",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  상세 보기
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookListPage;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/books_db")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>로딩 중...</h2>;
  }

  if (books.length === 0) {
    return <h2>등록된 도서가 없습니다.</h2>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: "32px" }}>
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
              gap: "20px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              alignItems: "flex-start",
            }}
          >
            {/* 왼쪽 표지 */}
            <div
              style={{
                width: "120px",
                height: "160px",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#f1f1f1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {book.coverImageUrl ? (
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ color: "#888" }}>
                  no image
                </span>
              )}
            </div>

            {/* 오른쪽 정보 */}
            <div
              style={{
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <h2>{book.title}</h2>

              <p style={{ color: "#666" }}>
                저자: {book.author}
              </p>

              <p style={{ color: "#444" }}>
                {book.summary}
              </p>

              <button
                onClick={() =>
                  navigate(`/books-db/${book.id}`)
                }
                style={{
                  width: "120px",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#222",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                상세 보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookListPage;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../api/books";

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (err) {
        console.error(err);
        setError("도서 목록을 불러오지 못했어요");
      }

      setLoading(false);
    }

    loadBooks();
  }, []);

  if (loading) {
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        불러오는 중...
      </p>
    );
  }

  if (error) {
    return (
      <p
        style={{
          textAlign: "center",
          color: "red",
        }}
      >
        {error}
      </p>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f5f1",
        padding: "60px",
      }}
    >
      {/* 책장 */}
      {[0, 1, 2, 3].map((shelfIndex) => (
        <div
          key={shelfIndex}
          style={{
            marginBottom: "70px",
          }}
        >
          {/* 책들 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "12px",
              paddingLeft: "20px",
              flexWrap: "wrap",
            }}
          >
            {books
              .slice(shelfIndex * 5, shelfIndex * 5 + 5)
              .map((book, index) => {
                const randomHeight =
                  180 + ((index * 25) % 80);

                const rotate =
                  index % 5 === 2
                    ? "rotate(-8deg)"
                    : "rotate(0deg)";

                return (
                  <Link
                    key={book.id}
                    to={`/books/${book.id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        width: "58px",
                        height: `${randomHeight}px`,
                        border: "3px solid #d58a45",
                        borderRadius: "8px",
                        backgroundColor: "#f8f5f1",
                        transition: "0.3s",
                        cursor: "pointer",
                        position: "relative",
                        transform: rotate,
                        overflow: "hidden",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.width =
                          "260px";

                        const content =
                          e.currentTarget.querySelector(
                            ".hover-content"
                          );

                        if (content) {
                          content.style.opacity = 1;
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.width =
                          "58px";

                        const content =
                          e.currentTarget.querySelector(
                            ".hover-content"
                          );

                        if (content) {
                          content.style.opacity = 0;
                        }
                      }}
                    >
                      {/* 책 제목 */}
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "14px",
                          transform:
                            "translateX(-50%)",
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          color: "#d58a45",
                          fontWeight: "700",
                          fontSize: "18px",
                          letterSpacing: "2px",
                          whiteSpace: "nowrap",
                          pointerEvents: "none",
                        }}
                      >
                        {book.title}
                      </div>

                      {/* hover 정보 */}
                      <div
                        className="hover-content"
                        style={{
                          opacity: 0,
                          transition: "0.3s",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          padding: "20px",
                          color: "#d58a45",
                          textAlign: "center",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: "700",
                            marginBottom: "10px",
                          }}
                        >
                          {book.author}
                        </p>

                        <p
                          style={{
                            fontSize: "14px",
                            lineHeight: "1.6",
                          }}
                        >
                          {book.summary}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>

          {/* 선반 */}
          <div
            style={{
              height: "14px",
              backgroundColor: "#f1ddd0",
              borderRadius: "4px",
              marginTop: "14px",
            }}
          />
        </div>
      ))}

      {/* footer */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "60px",
          color: "#d6a67a",
        }}
      >
        © 2026 작가의 산책. All rights reserved.
      </div>
    </div>
  );
}

export default BookListPage;
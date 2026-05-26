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
          fontFamily: "궁서",
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
          fontFamily: "궁서",
        }}
      >
        {error}
      </p>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f8f4ee",
        minHeight: "100vh",
        paddingBottom: "80px",
      }}
    >
      {/* 상단 */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 40px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            color: "#c9863b",
            fontFamily: "궁서",
            margin: 0,
            letterSpacing: "2px",
          }}
        >
          작가의 산책
        </h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "160px",
                height: "64px",
                borderRadius: "18px",
                border: "1px solid #d8a16a",
                backgroundColor: "#f8f4ee",
                color: "#c9863b",
                fontSize: "20px",
                fontFamily: "궁서",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              도서 목록
            </button>
          </Link>

          <Link to="/books/new" style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "160px",
                height: "64px",
                borderRadius: "18px",
                border: "none",
                backgroundColor: "#d88b3d",
                color: "white",
                fontSize: "20px",
                fontFamily: "궁서",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              도서 등록
            </button>
          </Link>
        </div>
      </div>

      {/* 책장 */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px",
        }}
      >
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
                gap: "10px",
                paddingLeft: "30px",
                flexWrap: "wrap",
              }}
            >
              {books
                .slice(shelfIndex * 5, shelfIndex * 5 + 5)
                .map((book, index) => {
                  const randomHeight = 220 + (index % 3) * 30;

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
                          width: "90px",
                          height: `${randomHeight}px`,
                          border: "3px solid #d6a06a",
                          borderRadius: "10px",
                          backgroundColor: "#fffaf5",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          boxSizing: "border-box",
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "#c9863b",
                          fontFamily: "궁서",
                          letterSpacing: "2px",
                          transition: "0.2s",
                          transform:
                            index % 4 === 2
                              ? "rotate(-8deg)"
                              : "rotate(0deg)",
                        }}
                      >
                        {book.title}
                      </div>
                    </Link>
                  );
                })}

              {/* 빈 공간 책 */}
              {[0, 1, 2].map((empty) => (
                <div
                  key={empty}
                  style={{
                    width: "90px",
                    height: "240px",
                    border: "2px dashed #e5c9a8",
                    borderRadius: "10px",
                    backgroundColor: "transparent",
                  }}
                />
              ))}
            </div>

            {/* 선반 */}
            <div
              style={{
                marginTop: "20px",
                width: "100%",
                height: "18px",
                backgroundColor: "#f1d8c7",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
      </div>

      {/* footer */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "40px",
          color: "#c9863b",
          fontFamily: "궁서",
          fontSize: "18px",
        }}
      >
        © 2026 작가의 산책. All rights reserved.
      </div>
    </div>
  );
}

export default BookListPage;
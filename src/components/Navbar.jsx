import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header
      style={{
        width: "100%",
        marginBottom: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          border: "2px solid #ccc",
          borderRadius: "999px",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: darkMode ? "#222" : "#fff",
        }}
      >
        {/* 왼쪽 토글 */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            width: "70px",
            height: "36px",
            borderRadius: "999px",
            border: "none",
            backgroundColor: darkMode ? "#444" : "#ddd",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "white",
              position: "absolute",
              top: "4px",
              left: darkMode ? "38px" : "4px",
              transition: "0.3s",
            }}
          />
        </button>

        {/* 가운데 로고 */}
        <h2
          style={{
            margin: 0,
            color: darkMode ? "white" : "black",
          }}
        >
          작가의 산책
        </h2>

        {/* 오른쪽 버튼 */}
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <Link to="/">
            <button
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
              }}
            >
              도서 목록
            </button>
          </Link>

          <Link to="/books_db/new">
            <button
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
              }}
            >
              도서 등록
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
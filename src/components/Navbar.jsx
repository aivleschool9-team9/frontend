import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      style={{
        width: "100%",
        borderBottom: "1px solid #ddd",
        padding: "20px 30px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* 가운데 제목 */}
        <h2
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            margin: 0,
            pointerEvents: "none",
          }}
        >
          작가의 산책
        </h2>

        {/* 오른쪽 버튼 */}
        <div
          style={{
            marginLeft: "auto",
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
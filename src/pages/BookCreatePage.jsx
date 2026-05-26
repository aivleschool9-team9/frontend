import { useState } from "react";
import { createBook } from "../api/books";

const styles = {
  container: {
    maxWidth: "780px",
    margin: "40px auto",
    padding: "40px 48px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  fieldWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  input: {
    padding: "9px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
  },
  textarea: {
    padding: "9px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    height: "150px",
    resize: "vertical",
  },
  errorMsg: {
    fontSize: "12px",
    color: "#e55",
    margin: 0,
  },
  btnRow: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
  },
};

function BookNewPage() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    summary: "",
    content: "",
    coverImageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [showAI, setShowAI] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim())
      newErrors.title = "제목을 입력해주세요";

    if (!form.author.trim())
      newErrors.author = "저자를 입력해주세요";

    if (!form.summary.trim())
      newErrors.summary = "한줄 요약을 입력해주세요";

    if (!form.content.trim())
      newErrors.content = "본문 내용을 입력해주세요";

    return newErrors;
  };

  const isFormValid =
    form.title.trim() &&
    form.author.trim() &&
    form.summary.trim() &&
    form.content.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const now = new Date().toISOString();

    await createBook({
      ...form,
      createdAt: now,
      updatedAt: now,
    });

    alert("등록이 완료되었습니다!");
  };

  return (
    <div style={styles.container}>
      <h1>새 도서 등록</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.fieldWrap}>
          <label>제목 *</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="제목 입력"
            style={styles.input}
          />

          {errors.title && (
            <p style={styles.errorMsg}>
              {errors.title}
            </p>
          )}
        </div>

        <div style={styles.fieldWrap}>
          <label>저자 *</label>

          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="저자 입력"
            style={styles.input}
          />

          {errors.author && (
            <p style={styles.errorMsg}>
              {errors.author}
            </p>
          )}
        </div>

        <div style={styles.fieldWrap}>
          <label>한줄 요약 *</label>

          <input
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="한줄 요약 입력"
            style={styles.input}
          />

          {errors.summary && (
            <p style={styles.errorMsg}>
              {errors.summary}
            </p>
          )}
        </div>

        <div style={styles.fieldWrap}>
          <label>본문 내용 *</label>

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="본문 입력"
            style={styles.textarea}
          />

          {errors.content && (
            <p style={styles.errorMsg}>
              {errors.content}
            </p>
          )}
        </div>

        <div style={styles.btnRow}>
          <button
            type="button"
            style={styles.input}
          >
            취소
          </button>

          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              padding: "9px 22px",
              border: "none",
              borderRadius: "6px",
              background: isFormValid ? "#333" : "#ccc",
              color: "#fff",
              cursor: isFormValid
                ? "pointer"
                : "not-allowed",
            }}
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookNewPage;
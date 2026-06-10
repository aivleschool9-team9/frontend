const BASE_URL = "http://localhost:8080/books";
const BASE_API = "http://localhost:8080";  

// 1. 도서 등록
export async function createBook(bookData) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("서버 에러 응답:", text);
      throw new Error(text);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("createBook 에러:", err);
  }
}

// 2. 도서 표지 수정
export const updateBookCover = async (bookId, imageUrl) => {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}/cover`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coverImageUrl: imageUrl,
      }),
    });
    return await res.json();
  } catch (err) {
    console.error("updateBookCover 에러:", err);
  }
};

// 3. 도서 목록 조회 - 검색/정렬 포함 (키워드 기반 검색)
export async function getBooks({keyword = "", sort = "newest"} = {}) {
  try {
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (sort) params.append("sort", sort);

    const res = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!res.ok) throw new Error("도서 목록 조회 실패");
    return await res.json();
  } catch (err) {
    console.error("getBooks 에러:", err);
  }
}

// 3-1. AI 유사도 검색
export async function semanticSearchBooks({queryVector, topK = 5}){
  try{
    const res = await fetch(`${BASE_URL}/semantic-search`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({queryVector, topK}),
    });
    if(!res.ok) throw new Error("AI 검색 실패");
    return await res.json();
  } catch (err) {
    console.error("semanticSearchBooks 에러:", err);
  }
} 

// 3-2. 검색 로그 기록
export async function createSearchLog({query, searchType, matchedBookCount, durationMs}){
  try{
    const res = await fetch(`${BASE_API}/search-logs`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({query, searchType, matchedBookCount, durationMs}),
  });
  if(!res.ok) throw new Error("검색 로그 기록 실패");
  return await res.json();
  } catch (err) {
    console.error("createSearchLog 에러:", err);
  }
}

// 3-3. 검색 결과 클릭 기록 (사용자 행동 분석용) - searchLogId는 3-2에서 생성된 로그의 ID, rankPosition은 검색 결과 내에서의 순위, similarityScore는 AI 검색의 유사도 점수
export async function createSearchResultClick({searchLogId, bookId, rankPosition, similarityScore}){
  try{
    const res = await fetch(`${BASE_API}/search-result-clicks`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({searchLogId, bookId, rankPosition, similarityScore}),
    });
    if(!res.ok) throw new Error("검색 결과 클릭 기록 실패");
    return await res.json();
  } catch (err) {
    console.error("createSearchResultClick 에러:", err);
  }
}

// 4. 도서 상세 조회
export async function getBooksById(bookId) {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}`);
    if (!res.ok) throw new Error("상세 조회 실패");
    return await res.json();
  } catch (err) {
    console.error("getBooksById 에러:", err);
  }
}

// 5. 도서 삭제
export async function deleteBook(bookId) {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("도서 삭제 실패");
    return true;
  } catch (err) {
    console.error("deleteBook 에러:", err);
    return false;
  }
}

// 6. 도서 수정
export async function updateBook(bookId, updatedFields) {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });
    if (!res.ok) throw new Error("도서 수정 실패");
    return await res.json();
  } catch (err) {
    console.error("updateBook 에러:", err);
    throw err;
  }
}

// 7. 좋아요 기능
export async function likeBook(bookId, likes){
  try {
    const res = await fetch(`${BASE_URL}/${bookId}/likes`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({likes}),
    });
    if (!res.ok) throw new Error("좋아요 실패");
    return await res.json();
  } catch (err) {
    console.error("likeBook 에러:", err);
  }
}

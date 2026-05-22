import React, { useState } from 'react';

// 부모(App.jsx)로부터 현재 선택된 도서 데이터(book), 화면전환(setView), 데이터 업데이트 함수(onUpdateBook)를 받습니다.
function BookEditPage({ book, setView, onUpdateBook }) {
  
  // 1. 기존 도서 데이터를 Input창의 초기값(State)으로 바인딩합니다.
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [summary, setSummary] = useState(book?.summary || "");
  const [content, setContent] = useState(book?.content || "");
  const [coverImageUrl, setCoverImageUrl] = useState(book?.coverImageUrl || "");

  // 3일차 OpenAI 연동 기능 테스트를 위한 임시 상태값
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  // 💡 [AI 표지 수정 로직] 3일차 OpenAI API 가동 시 사용할 프레임 미리 선언
  const handleGenerateAiCover = () => {
    if (!apiKey) {
      alert("OpenAI API Key를 입력창에 적어주세요! (테스트용)");
      return;
    }
    
    setLoading(true); // 로딩 스피너 작동 및 버튼 비활성화 트리거 [추가 기능 반영]
    
    console.log("본문 내용을 기반으로 프롬프트 구성 중...", content);
    
    // 3일차 fetch(POST) 연동 전, 비동기 통신을 흉내 내는 가짜(Mock) 동작 처리
    setTimeout(() => {
      // 가짜 이미지 생성 주소 주입
      setCoverImageUrl("https://via.placeholder.com/1024x1536.png?text=AI+Edited+Cover");
      setLoading(false);
      alert("AI 표지 이미지가 임시로 수정/생성되었습니다!");
    }, 2000);
  };

  // 💡 [폼 제출 로직] 수정 완료 버튼 클릭 시 실행
  const handleSubmit = (e) => {
    e.preventDefault(); // 브라우저 새로고침 방지

    // 필수 항목 공백 유효성 검사 [추가 기능 반영]
    if (!title.trim() || !author.trim() || !summary.trim() || !content.trim()) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    // 변경된 새로운 데이터를 객체로 조립 (2일차에 이 구조 그대로 서버에 PATCH 요청을 보냄)
    const updatedBookData = {
      ...book,          // 기존 id나 오리지널 필드 유지
      title,
      author,
      summary,
      content,
      coverImageUrl,
      updatedAt: new Date().toISOString() // 💡 기획안 명세: 수정 시점 타임스탬프 반영
    };

    console.log("부모 통제실로 보낼 PATCH 타겟 데이터:", updatedBookData);
    
    if (onUpdateBook) {
      onUpdateBook(updatedBookData); // 부모 State 배열을 교체하는 함수 실행
    }

    alert("도서 정보가 성공적으로 수정되었습니다!");
    setView('detail'); // 수정 완료 후 상세 페이지로 전환
  };

  return (
    <div style={{ 
      padding: '25px', 
      border: '2px solid #ff9800', // 수정 페이지는 주황색 테두리로 시각적 구분
      borderRadius: '12px', 
      margin: '30px auto', 
      maxWidth: '750px', 
      backgroundColor: '#1a1a1a', 
      color: '#e2e2e2',
      textAlign: 'left',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    }}>
      <h2 style={{ color: '#ff9800', margin: 0, textAlign: 'center' }}>⚙️ 도서 정보 및 AI 표지 수정</h2>
      <hr style={{ borderColor: '#333', margin: '15px 0' }} />

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* [왼쪽 레이아웃] AI 표지 수정 및 생성 관리 도구 상자 */}
        <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ 
            width: '200px', 
            height: '300px', 
            backgroundColor: '#2e2e2e', 
            borderRadius: '8px', 
            border: '1px dashed #ff9800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {loading ? (
              <div style={{ textAlign: 'center', color: '#ff9800' }}>🔄 생성 중...</div>
            ) : coverImageUrl ? (
              <img src={coverImageUrl} alt="표지 미리보기" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ color: '#888', fontSize: '0.9rem' }}>표지 미생성</span>
            )}
          </div>

          {/* API Key 입력 폼 가이드 */}
          <input 
            type="password" 
            placeholder="OpenAI API KEY" 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: 'white' }}
          />
          <button 
            type="button" 
            onClick={handleGenerateAiCover}
            disabled={loading}
            style={{ backgroundColor: '#ff9800', color: 'black', border: 'none', padding: '8px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {coverImageUrl ? "AI 표지 변경/재생성" : "AI 표지 새 생성"}
          </button>
        </div>

        {/* [오른쪽 레이아웃] 텍스트 정보 입력 필드 */}
        <div style={{ flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <label>
            <strong>📖 책 제목 *</strong>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: 'white' }} />
          </label>

          <label>
            <strong>✍️ 저자 *</strong>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: 'white' }} />
          </label>

          <label>
            <strong>💬 한 줄 요약 * (최대 50자)</strong>
            <input type="text" maxLength={50} value={summary} onChange={(e) => setSummary(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: 'white' }} />
            <span style={{ fontSize: '0.8rem', color: '#888' }}>{summary.length} / 50자</span>
          </label>

          <label>
            <strong>📝 도서 상세 내용 *</strong>
            <textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: 'white', resize: 'vertical', lineHeight: '1.5' }} />
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setView('detail')} style={{ backgroundColor: '#2f2f2f', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              취소
            </button>
            <button type="submit" style={{ backgroundColor: '#646cff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              수정 완료
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}

export default BookEditPage;
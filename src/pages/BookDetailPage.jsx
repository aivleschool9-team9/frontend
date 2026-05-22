import React from 'react';

function BookDetailPage({ book, setView }) {

  // 데이터가 없을경우 임시 데이터 보여주기 
  const displayBook = book || {
    id: "1",
    title: "별빛 아래의 서점",
    author: "홍길동",
    summary: "작은 마을 서점의 1년을 담은 에세이",
    content: "어두운 밤하늘 아래, 조용히 불을 밝힌 작은 서점에서 일어나는 따뜻한 이야기들.",
    coverImageUrl: "" // "" 이면 No Image가 뜨고, 이미지 주소가 있으면 사진이 나옵니다.
  };

  return (
    <div style={{ 
      padding: '25px', 
      border: '2px solid #646cff', 
      borderRadius: '12px', 
      margin: '30px auto', 
      maxWidth: '750px', 
      backgroundColor: '#1a1a1a', 
      color: '#e2e2e2',
      textAlign: 'left',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h2 style={{ color: '#646cff', margin: 0, textAlign: 'center' }}>📚 도서 상세 페이지</h2>
      <hr style={{ borderColor: '#333', width: '100%', margin: 0 }} />

      {/* 좌우 정렬 */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* 💡 왼쪽에 이미지 파트(사진 없으면 no image) */}
        <div style={{ 
          width: '200px', 
          height: '300px', 
          backgroundColor: '#2e2e2e', 
          borderRadius: '8px', 
          border: '1px solid #444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {displayBook.coverImageUrl ? (
            <img 
              src={displayBook.coverImageUrl} 
              alt="도서 표지" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          ) : (
            <div style={{ textAlign: 'center', color: '#888' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>🖼️</div>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>No Image</span>
            </div>
          )}
        </div>

        {/* 오른쪽에는 책의 정보를 표시(책 제목, 기타등등 ) */}
        <div style={{ flex: 1, minWidth: '250px' }}>
          <p style={{ fontSize: '1.3rem', margin: '0 0 10px 0', fontWeight: 'bold', color: '#fff' }}>
            {displayBook.title}
          </p>
          <p style={{ margin: '0 0 15px 0', color: '#aaa' }}>
            <strong>✍️ 저자:</strong> {displayBook.author}
          </p>
          
          <div style={{ 
            backgroundColor: '#2a2a2a', 
            padding: '12px', 
            borderRadius: '6px', 
            fontStyle: 'italic',
            borderLeft: '4px solid #646cff',
            marginBottom: '15px'
          }}>
            <strong>💬 한줄소개:</strong> "{displayBook.summary}"
          </div>
          
          <p style={{ lineHeight: '1.6', margin: 0 }}>
            <strong>📝 상세내용:</strong><br />
            {displayBook.content}
          </p>
        </div>

      </div>

      <hr style={{ borderColor: '#333', margin: '10px 0 0 0' }} />
      
      {/* 하단 제어 버튼 그룹 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <button 
          onClick={() => setView('list')} 
          style={{ backgroundColor: '#2f2f2f', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          ← 목록으로
        </button>
        <button 
          onClick={() => setView('edit')} 
          style={{ backgroundColor: '#646cff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          수정하기 →
        </button>
      </div>
    </div>
  );
}

export default BookDetailPage;
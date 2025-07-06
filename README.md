# 가족 여행 사진첩 🏠📸

가족 여행에서 찍은 사진을 올리고 관리할 수 있는 웹사이트입니다.

## ✨ 기능

- 📸 **사진 업로드** (드래그 앤 드롭 지원)
- 📝 **사진 설명** 작성
- 🗑️ **사진 삭제**
- 📱 **모바일 최적화**
- 🌐 **반응형 디자인**

## 🚀 배포 방법

### 1. Supabase 설정
1. [supabase.com](https://supabase.com) 가입
2. 새 프로젝트 생성
3. **Storage** 버킷 생성: `photos`
4. **Database** 테이블 생성:

```sql
CREATE TABLE photos (
  id BIGSERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Vercel 배포
1. [vercel.com](https://vercel.com) 가입
2. GitHub에 코드 업로드
3. Vercel에서 GitHub 연결
4. 환경변수 설정:
   - `SUPABASE_URL`: Supabase 프로젝트 URL
   - `SUPABASE_ANON_KEY`: Supabase 익명 키

### 3. 로컬 개발
```bash
npm install
npm run dev
```

## 📁 파일 구조

```
HomeFrame/
├── index.html          # 메인 웹사이트
├── api/                # Vercel 서버리스 함수
│   ├── upload-photo.js # 사진 업로드
│   ├── get-photos.js   # 사진 목록 조회
│   └── delete-photo.js # 사진 삭제
├── package.json        # 의존성
└── vercel.json         # Vercel 설정
```

## 🎯 사용법

1. 사진을 드래그하거나 클릭해서 선택
2. 설명 입력
3. "사진 올리기" 버튼 클릭
4. 사진 클릭하면 크게 보기
5. 삭제 버튼으로 사진 제거

## 💾 저장 용량

- **Supabase 무료 티어**: 1GB (약 200-500장 사진)
- **Pro 플랜**: 100GB (약 20,000-50,000장 사진)

## 🔧 기술 스택

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Vercel Functions
- **Database**: Supabase
- **Storage**: Supabase Storage
- **Hosting**: Vercel 
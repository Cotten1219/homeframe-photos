# Supabase 설정 가이드 🗄️

## 1. Supabase 가입
1. [supabase.com](https://supabase.com) 접속
2. "Start your project" 클릭
3. GitHub로 로그인
4. "New Project" 클릭

## 2. 프로젝트 생성
1. **Organization** 선택 (새로 만들거나 기존 것 선택)
2. **Project name**: `homeframe-photos`
3. **Database password**: 안전한 비밀번호 설정
4. **Region**: `Northeast Asia (Tokyo)` 선택
5. "Create new project" 클릭

## 3. Storage 설정
1. 왼쪽 메뉴에서 **Storage** 클릭
2. **New bucket** 클릭
3. **Name**: `photos`
4. **Public bucket** 체크 ✅
5. "Create bucket" 클릭

## 4. Database 테이블 생성
1. 왼쪽 메뉴에서 **SQL Editor** 클릭
2. **New query** 클릭
3. 아래 SQL 실행:

```sql
CREATE TABLE photos (
  id BIGSERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

4. **Run** 클릭

## 5. API 키 확인
1. 왼쪽 메뉴에서 **Settings** → **API** 클릭
2. **Project URL** 복사 (예: `https://abcdefghijklm.supabase.co`)
3. **anon public** 키 복사 (예: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 6. 완료! 🎉
이제 Supabase 설정이 완료되었습니다! 
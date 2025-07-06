# Vercel 배포 가이드 🚀

## 1. Vercel 가입
1. [vercel.com](https://vercel.com) 접속
2. **Continue with GitHub** 클릭
3. GitHub 계정으로 로그인

## 2. 프로젝트 가져오기
1. **New Project** 클릭
2. **Import Git Repository**에서 GitHub 저장소 선택
3. **homeframe-photos** 선택
4. **Deploy** 클릭

## 3. 환경변수 설정
1. **Settings** → **Environment Variables** 클릭
2. 다음 변수 추가:

### SUPABASE_URL
- **Name**: `SUPABASE_URL`
- **Value**: Supabase에서 복사한 Project URL
- **Environment**: Production, Preview, Development 모두 선택

### SUPABASE_ANON_KEY
- **Name**: `SUPABASE_ANON_KEY`
- **Value**: Supabase에서 복사한 anon public 키
- **Environment**: Production, Preview, Development 모두 선택

3. **Save** 클릭

## 4. 재배포
1. **Deployments** 탭으로 이동
2. **Redeploy** 클릭

## 5. 완료! 🎉
이제 공개 URL이 생성되었습니다!
- **URL**: `https://homeframe-photos.vercel.app` (예시)
- **모든 기기에서 접속 가능**
- **사진 영구 저장** 
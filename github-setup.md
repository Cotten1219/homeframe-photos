# GitHub 업로드 가이드 📤

## 1. GitHub 계정 확인
- GitHub 계정이 없다면 [github.com](https://github.com)에서 가입

## 2. 새 저장소 생성
1. GitHub에서 **New repository** 클릭
2. **Repository name**: `homeframe-photos`
3. **Public** 선택
4. **Create repository** 클릭

## 3. 코드 업로드
### 방법 A: GitHub Desktop 사용 (추천)
1. [GitHub Desktop](https://desktop.github.com) 다운로드
2. **Clone a repository** → **URL** 탭
3. GitHub 저장소 URL 입력
4. **Local path**: `~/Desktop/HomeFrame` 선택
5. **Clone** 클릭
6. 모든 파일이 자동으로 업로드됨

### 방법 B: 터미널 사용
```bash
cd ~/Desktop/HomeFrame
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[사용자명]/homeframe-photos.git
git push -u origin main
```

## 4. 완료! 🎉
이제 GitHub에 코드가 업로드되었습니다! 
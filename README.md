# 🎓 온라인 명륜당 — 교내 영상 학습 플랫폼

## 🧭 개요  
온라인 명륜당은 **성균관대학교 학생들을 위한 교내 영상 학습 플랫폼**입니다.  
강의, 행사, 세미나 등 다양한 교내 영상 콘텐츠를 한 곳에서 탐색하고 시청할 수 있습니다.  

단순한 영상 모음이 아닌, **학습 경험을 연결하는 교내 학습 허브**로서  
학생들의 콘텐츠 접근성과 이용 편의성을 높이는 것을 목표로 합니다.  

---

## 🛠 기술 스택  

| 구분 | 기술 |
|------|------|
| **Framework** | Next.js (TypeScript) |
| **Styling** | TailwindCSS |
| **UI Library** | Shadcn UI |
| **Package Manager** | pnpm |
| **Deployment** | OnPremise |

---

## ✨ 주요 기능  

### 1. 카테고리별 영상 탐색  
- 학습, 행사, 홍보 등 카테고리별 콘텐츠 분류  
- SSR 기반 페이지 로딩으로 빠른 탐색 가능  

### 2. 검색 기능  
- 제목, 설명, 태그 기반 검색 지원  
- 입력 시 자동 필터링 및 결과 리스트 표시  

### 3. 정렬 기능  
- 최신순, 인기순, 조회순 등 기준별 정렬 가능  
- 사용자 맞춤형 콘텐츠 정렬 경험 제공  

### 4. 영상 업로드  
- 관리자가 직접 영상 등록 및 썸네일, 설명 입력 가능  
- 메타데이터 기반으로 카테고리 자동 분류  

---

## 🖥️ 서비스 화면  

<img width="563" height="265" alt="image" src="https://github.com/user-attachments/assets/60810cc8-e2d5-4a24-a07a-c937114ae622" />
<img width="563" height="265" alt="image" src="https://github.com/user-attachments/assets/083dea16-b355-4820-99d4-935938503270" />

---

## 💡 개발 배경  
교내 영상 자료가 부서별로 분산되어 접근이 불편한 점을 해결하고자,  
학생들이 **모든 교내 영상을 한눈에 탐색할 수 있는 통합 플랫폼**을 개발했습니다.  

---

## 🚀 실행 방법  

```bash
# 프로젝트 클론
git clone https://github.com/SKKU-Online-Learning-System/mvp-frontend-nextjs.git

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

---

## 📈 향후 계획  

- **검색 및 정렬 기능 고도화**  
- **플레이리스트 및 즐겨찾기 기능 추가**  
- **콘텐츠 추천 시스템 도입**  
- **UI/UX 개선 및 접근성 강화**

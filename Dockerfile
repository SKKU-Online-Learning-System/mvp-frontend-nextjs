# 1. 기본 Node 이미지 설정
FROM node:22-alpine

# 2. pnpm 설치 (글로벌)
RUN corepack enable && corepack prepare pnpm@10.32.1 --activate

# 3. 작업 디렉토리 설정
WORKDIR /usr/src/app

ENV NEXT_TELEMETRY_DISABLED=1

# 4. 종속성 설치 (의존성 캐싱 최적화를 위해 순서 중요)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 5. 앱 소스 복사
COPY . .

# 6. 앱 빌드
RUN pnpm build

RUN chown -R node:node /usr/src/app

USER node

# 7. 포트 노출
EXPOSE 3000

# 8. 실행 명령어
CMD ["node", "node_modules/next/dist/bin/next", "start"]

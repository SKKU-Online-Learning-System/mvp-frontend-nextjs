#!/bin/bash

IMAGE_NAME="skkussa/mrdang-frontend:latest"

echo "🔨 Building Docker image..."
docker build -t $IMAGE_NAME .

if [ $? -ne 0 ]; then
  echo "Build failed. Exiting."
  exit 1
fi

echo "🚀 Pushing image to Docker Hub..."
docker push $IMAGE_NAME

if [ $? -ne 0 ]; then
  echo "❌ Push failed. Exiting."
  exit 1
fi

echo "✅ Done: $IMAGE_NAME pushed successfully!"
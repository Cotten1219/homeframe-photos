#!/bin/bash

# 백업 폴더 생성
BACKUP_DIR="$HOME/Desktop/HomeFrame_Backup/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# 사진 백업
if [ -d "backend/uploads" ]; then
    cp -r backend/uploads "$BACKUP_DIR/"
    echo "✅ 사진 백업 완료: $BACKUP_DIR/uploads/"
fi

# 데이터 백업
if [ -f "backend/photos.json" ]; then
    cp backend/photos.json "$BACKUP_DIR/"
    echo "✅ 데이터 백업 완료: $BACKUP_DIR/photos.json"
fi

echo "🎉 백업 완료! 위치: $BACKUP_DIR" 
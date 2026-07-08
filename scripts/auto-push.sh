#!/bin/bash
# Auto-commit and push script for MELINAWO FOUNDATION website
# Commits any changes and pushes to GitHub

cd /home/z/my-project

# Check if there are changes to commit
CHANGES=$(git status --porcelain 2>/dev/null)

if [ -z "$CHANGES" ]; then
  echo "$(date '+%Y-%m-%d %H:%M:%S') - No changes to commit."
  exit 0
fi

# Stage all changes (force-add DB file)
git add -A
git add -f db/custom.db

# Commit with timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
git commit -m "Auto-push: changes at ${TIMESTAMP}" --allow-empty

# Push to remote
git push origin main 2>&1

echo "$(date '+%Y-%m-%d %H:%M:%S') - Pushed changes to GitHub."
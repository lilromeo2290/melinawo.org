#!/bin/bash
# keep-alive.sh — Ensures the MELINAWO production server NEVER goes down
# Runs every 60 seconds via crontab

PORT=3000
LOG="/home/z/my-project/server.log"

if ! curl -sf -o /dev/null http://localhost:$PORT 2>/dev/null; then
  echo "[$(date)] Server down! Restarting production server..." >> "$LOG"
  
  # Kill any stale processes on port 3000
  fuser -k $PORT/tcp 2>/dev/null
  
  # Start the standalone production server
  cd /home/z/my-project
  nohup node .next/standalone/server.js -p $PORT >> "$LOG" 2>&1 &
  
  echo "[$(date)] Server restarted on port $PORT" >> "$LOG"
fi
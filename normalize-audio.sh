#!/usr/bin/env bash
ffmpeg-normalize src/audio/$1 \
  --extension mp3 \
  --output-folder src/audio \
  --force \
  --audio-codec libmp3lame \
  --normalization-type peak \
  --target 0 \
  --verbose
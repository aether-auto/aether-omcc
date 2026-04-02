#!/bin/bash
PORT=${1:-8420}
DIR=".ui-specs"
if [ ! -d "$DIR" ]; then
  echo "Error: $DIR directory not found"
  exit 1
fi
echo "Serving UI specs at http://localhost:$PORT"
python3 -m http.server "$PORT" --directory "$DIR"

#!/bin/sh
git config core.hooksPath .githooks
chmod +x .githooks/commit-msg
echo "\033[0;33m[Patch]\033[0m : 후크가 적용됐습니다."
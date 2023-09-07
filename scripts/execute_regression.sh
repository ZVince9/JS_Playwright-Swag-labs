#!/bin/bash
cd app/
sed -i -e "s+STAGE_URL=https://staging.d1jlam3ksl1q6e.amplifyapp.com+STAGE_URL=$2 +g" .env

cat .env
echo "\n"

npm run test-regression-chrome
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 获取leetcode
# npm run ac_record

# git add ./docs/.vitepress/components/lcData.json
# git commit -m "get ac record"
# git push

# 生成静态文件
npm run build

# 进入生成的文件夹
cd ./dist

# cp -r ../../../CNAME ./


git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Younglina/china.git master:gh-pages

cd -

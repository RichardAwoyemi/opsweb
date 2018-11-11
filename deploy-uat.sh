#!/bin/sh

HEROKU_API_KEY="4da309c4-a913-4b38-a4ae-bfc099273ea5"
HEROKU_APP_NAME="opsonion-web"

git push https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_NAME.git HEAD:master 
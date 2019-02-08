#!/bin/sh

export AWS_ACCESS_KEY_ID="AKIAJSKDPYHGG3W7OZKQ"
export AWS_SECRET_ACCESS_KEY="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"
HEROKU_API_KEY="4da309c4-a913-4b38-a4ae-bfc099273ea5"
HEROKU_APP_NAME="opsonion-web"
AWS_BUCKET_TARGET="opsonion.com"

ng build --prod
git push https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_NAME.git HEAD:master 
aws s3 sync ./dist/opsonion-web/ s3://$AWS_BUCKET_TARGET --delete --exclude '.git/*'

unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
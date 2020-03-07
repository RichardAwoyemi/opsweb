#!/bin/sh

export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
AWS_BUCKET_TARGET="opsonion.com"

ng build --prod --configuration=production
aws s3 sync ../dist/opsonion-web/ s3://$AWS_BUCKET_TARGET --delete --exclude '.git/*'

unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY

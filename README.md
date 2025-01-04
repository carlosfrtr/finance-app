npm run build

aws s3 mb s3://br.fortal.torres

aws s3 sync ./out s3://br.fortal.torres --delete

aws s3 website s3://br.fortal.torres --index-document index.html --error-document error.html
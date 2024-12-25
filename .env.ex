NODE_ENV='development'

APPLICATION_PORT=4000
APPLICATION_URL='http://localhost:${APPLICATION_PORT}'
ALLOWED_ORIGIN='http://localhost:4000'

POSTGRES_USER='postgres-admin'
POSTGRES_PASSWORD='123456'
POSTGRES_HOST='localhost'
POSTGRES_PORT='5433'
POSTGRES_DB='starter-server'
POSTGRES_URI='postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}'

REDIS_USER='redis-admin'
REDIS_PASSWORD='pass123456'
REDIS_HOST='localhost'
REDIS_PORT='6379'
REDIS_URI='redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}'

JWT_ACCESS_SECRET='access-secret'
JWT_ACCESS_EXPIRES='1h'

JWT_REFRESH_SECRET='refresh-secret'
JWT_REFRESH_EXPIRES='7d'

AWS_S3_REGION=#your region
AWS_S3_ENTRYPOINT=#"your entry point if it differs from AWS"
AWS_SECRET_ACCESS_KEY=#"your secret access key"
AWS_ACCESS_KEY_ID=#"your access key"
AWS_BUCKET_NAME=#"your bucket name"

GOOGLE_CLIENT_ID=#"google client id"
GOOGLE_CLIENT_SECRET=#"google client secret"


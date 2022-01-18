# grpc-test-nestjs
Testing gRPC transport with the NestJS framework on GCP Cloud Run.

## To run locally

```bash
npm run proto:build # make sure the proto file interface builds are up to date
npm run dev
```

## After editing a *.proto file

```bash
npm run proto:build
```

## To deploy to cloud run

```bash
gcloud builds submit --tag gcr.io/[project-id]/[service-name]
gcloud run deploy [service-name] --image gcr.io/[project-id]/[service-name] --platform managed --allow-unauthenticated --region [region] [optional:] --min-instances 1 --max-instances 1
```

## To test

### Locally

```bash
grpcurl -proto src/proto/hero.proto -d '{"id": 1}' --plaintext localhost:3001 hero.HeroesService/FindOne
```

### Cloud Run

```bash
ENDPOINT=$(\
  gcloud run services list \
  --project=[project-id] \
  --region=[region] \
  --platform=managed \
  --format="value(status.address.url)" \
  --filter="metadata.name=[service-name] ") 
ENDPOINT=${ENDPOINT#https://} && echo ${ENDPOINT}

grpcurl -proto src/proto/hero.proto -d '{"id": 1}' $ENDPOINT:443 hero.HeroesService/FindOne
```
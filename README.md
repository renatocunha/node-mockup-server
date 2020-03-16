# node-mockup-server
Simple Application to mockingup RESTful requests.

Run:

```bash
~$ docker pull renatocunha/node-mockup-server:latest
~$ docker run --rm -ti -p 9000:9000 renatocunha/node-mockup-server:latest

```

EndPoints so far:

```bash
GET ->localhost:9000/v1/artifacts #<-list all json files in the artifacts/ folder
GET -> localhost:9000/v1/artifact:uuid #<-search for a specific json file in the artifacts/ folder
POST -> localhost:9000/v1/artifact #<- creates a new json file with the body of the Post request
```
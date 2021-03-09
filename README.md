# gRPC Chat Example with Node JS

This project creates a simple command line chat using gRPC and NodeJS to show a stream and bidirectional communication.

Check the full article in: https://techblog.fexcofts.com/2018/07/20/grpc-nodejs-chat-example/

- Install Modules:

    ``$ npm install``

- Start Server:

    ``$ node server --target 0.0.0.0:5001``

- Start client:

    ``$ node client --target 0.0.0.0:5001``


## Docker instructions

### Build Container
```
docker build -t aknot242/grpc-node-chat .
```

### Start Container
```
docker run -p 50054:5001 -d --restart unless-stopped aknot242/grpc-node-chat
```

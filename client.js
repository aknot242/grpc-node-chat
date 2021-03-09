let grpc = require("grpc");
let parseArgs = require("minimist");
var protoLoader = require("@grpc/proto-loader");
var readline = require("readline");

//Read terminal Lines
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("protos/chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);


let username;

let argv = parseArgs(process.argv.slice(2), {
  string: "target"
});

if (argv.target) {
  target = argv.target;
} else {
  target = "0.0.0.0:5001";
}

//Create gRPC client
let client = new proto.example.Chat(
  target,
  grpc.credentials.createInsecure()
);

//Start the stream between server and client
function startChat() {
  let channel = client.join({ user: username });

  channel.on("data", onData);

  rl.on("line", function(text) {
    client.send({ user: username, text: text }, res => {});
  });
}

//When server send a message
function onData(message) {
  if (message.user == username) {
    return;
  }
  console.log(`${message.user}: ${message.text}`);
}

//Ask user name than start the chat
rl.question("What is your name? ", answer => {
  username = answer;

  startChat();
});

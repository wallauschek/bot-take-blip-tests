import BlipSdk from "blip-sdk";
import WebSocketTransport from "lime-transport-websocket";
import dotenv from "dotenv";

dotenv.config();

// Put your identifier and access key here
let IDENTIFIER = process.env.BLIP_IDENTIFIER;
let ACCESS_KEY = process.env.BLIP_ACCESS_KEY;

// Create a client instance passing the identifier and accessKey of your chatbot
let client = new BlipSdk.ClientBuilder()
  .withIdentifier(IDENTIFIER)
  .withAccessKey(ACCESS_KEY)
  .withTransportFactory(() => new WebSocketTransport())
  .build();

// Connect with server asynchronously
// Connection will occurr via websocket on 8081 port.
client
  .connect() // This method return a 'promise'.
  .then(function (session) {
    // Connection success. Now is possible send and receive envelopes from server. */
    console.log("Application started. Press Ctrl + c to stop.");
  })
  .catch(function (err) {
    /* Connection failed. */
  });

client.addMessageReceiver("text/plain", async function (message) {
  var msg = {
    type: "text/plain",
    content: `${message.content} - retorno`,
    to: message.from,
  };
  console.log(typeof message.content != "object" ? message : "");
  typeof message.content != "object" ? client.sendMessage(msg) : "";
});

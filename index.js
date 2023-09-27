const express = require("express");

const app = express();
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(express.json());
const cors = require("cors");

const webpush = require("web-push");

app.use(bodyParser.json());
const a = webpush.generateVAPIDKeys();
console.log(a);

const apiKeys = {
  publicKey:
    "BOWER7rRO3_KRqiV4t5EYrpEckxZu13SjdOAOuNd0CHEQsXTCeEBKiNVyV_eT3yQday9xxa-darbcBJyotbmRno",
  privateKey: "9Z5BklMxek4lT_Js3Jy0piuyoP26p3nlxNjVKknR5gg",
};
webpush.setVapidDetails(
  "mailto:rith8596@gmail.com",

  apiKeys.publicKey,
  apiKeys.privateKey
);
console.log(0);
const subDatabse = [
  // {
  //   endpoint:
  //     "https://fcm.googleapis.com/fcm/send/en_Em5-jHJw:APA91bGhtavH2UoFp1YUgQX6Q99MHT7f491jonjKlgcyeWLdqZnGQCQA35rNJZVOCxgAKX8gMH-96mv1wpi21vYf0VJcHNmrizsUcWoszL7mU8RgXjIVRoDJ2dXE92x_GgZ0QiCd2dJ8",
  //   expirationTime: null,
  //   keys: {
  //     p256dh:
  //       "BB0IrPkMRgdZYW0Y120IhjA21jYbSTIybVO8xp0dxdCS-Qgc34dGP9571wwI4wyK7UkRMj3TSjEt2H1NjCN0x7E",
  //     auth: "ugMp2KfAs_LOy-fH70bz3rHkLbLSZEu2OaaUOf_My7s",
  //   },
  // },
];
let message = "";
//-----------------------------------------------
// mongoose
//   .connect(
//     "mongodb+srv://pavankumarmoka:3ccG3rpxQoWOGEJl@expresscluster.gfleory.mongodb.net/Bakery?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("success"));

//------------------

app.get("/", async (req, res) => {
  try {
    // console.log(req)
    const savedPost = await Items.find();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // res.send(req.body)
});

app.post("/subscribe", async (req, res) => {
  try {
    subDatabse.push(req.body.subscription);
    message = req.body.message;
    console.log(req.body);
    await webpush.sendNotification(subDatabse[0], message);
    webpush.sendNotification(subDatabse[0], "Hello world");
    res
      .json({ status: "Success", message: "Subscription saved!" })
      .catch((err) => {
        err.message;
      });
  } catch {
    (err) => {
      console.log(err.message);
    };
  }
});
// .catch((err) => {
//   console.log(err.message);
// });

app.get("/send-notification", (req, res) => {
  webpush.sendNotification(subDatabse[0], "Hello world");
  res.json({ statue: "Success", message: "Message sent to push service" });
});
//
app.delete("/deleteitems", async (req, res) => {
  try {
    // console.log(req)
    await Items.deleteMany();
    res.status(200).json({ delete: "done" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//
app.listen(3003, () => {
  console.log("Server is running");
});

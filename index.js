import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import upload from "./config/storage.config.js";

const app = express();
dotenv.config();
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     const time = new Date().getTime();
//     cb(null, file.originalname + "-" + time);
//   },
// });

// const upload = multer({ storage: storage });

app.get("/", function (_, response) {
  response.sendFile(process.cwd() + "/views/index.html");
});

app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  async (request, response) => {
    console.log(request.file);
    response.json({
      name: request.file.originalname,
      type: request.file.mimetype,
      size: request.file.size,
    });
  }
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});

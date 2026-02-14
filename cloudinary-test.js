import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dpulwihjp",
  api_key: "452745227876156",
  api_secret: "YgRXbfiz0KQqM7tjk94K5iIUiCU",
});

cloudinary.uploader
  .upload("https://res.cloudinary.com/demo/image/upload/sample.jpg")
  .then(result => console.log("SUCCESS:", result.secure_url))
  .catch(err => console.error("ERROR:", err));

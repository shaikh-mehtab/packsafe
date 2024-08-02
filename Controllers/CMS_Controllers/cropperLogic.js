// const path = require("path");
// const sharp = require("sharp");

// const cropperLogic = (req, res) => {
//   const { filename } = req.params;
//   const { width, height, x, y } = req.query;

//   const imagePath = path.join("public", filename);

//   sharp(imagePath)
//     .extract({
//       left: parseInt(x),
//       top: parseInt(y),
//       width: parseInt(width),
//       height: parseInt(height),
//     })
//     .toBuffer()
//     .then((transformedBuffer) => {
//       res.set("Content-Type", "image/jpeg");
//       res.send(transformedBuffer);
//     })
//     .catch((error) => {
//       console.error("Error transforming image:", error);
//       res.status(500).send("Error transforming image.");
//     });
// };

// module.exports = { cropperLogic };

//new cropper with no transform ability
const path = require("path");
const sharp = require("sharp");

const cropperLogic = (req, res) => {
  const { filename } = req.params;
  const { width, height, x, y } = req.query;

  const imagePath = path.join(__dirname, "..", "..", "public", filename);
  console.log(imagePath);

  // Check if cropping parameters are provided
  const shouldCrop = width && height && x && y;

  if (shouldCrop) {
    sharp(imagePath)
      .extract({
        left: parseInt(x),
        top: parseInt(y),
        width: parseInt(width),
        height: parseInt(height),
      })
      .toBuffer()
      .then((transformedBuffer) => {
        res.set("Content-Type", "image/jpeg");
        res.send(transformedBuffer);
      })
      .catch((error) => {
        console.error("Error transforming image:", error);
        res.status(500).send("Error transforming image.");
      });
  } else {
    // No cropping parameters provided, send the full image
    sharp(imagePath)
      .toBuffer()
      .then((imageBuffer) => {
        res.set("Content-Type", "image/jpeg");
        res.send(imageBuffer);
      })
      .catch((error) => {
        console.error("Error sending image:", error);
        res.status(500).send("Error sending image.");
      });
  }
};

module.exports = { cropperLogic };

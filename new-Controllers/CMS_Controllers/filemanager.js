const fs = require("fs");
const path = require("path");
const multer = require("multer");

const fetchAllFiles = (req, res) => {
  const directory = req.params.directory;
  const PublicDirectory = path.join("..", "..", "public", directory);
  console.log(PublicDirectory);
  try {
    fs.stat(PublicDirectory, (err, stats) => {
      if (err || !stats.isDirectory()) {
        return res.status(404).json({
          message: "Directory not found",
          status: "error",
        });
      }

      fs.readdir(PublicDirectory, (err, items) => {
        if (err) {
          return res.status(500).json({
            message: "Error retrieving files",
            error: err.message,
          });
        }

        const data = [];
        if (items.length === 0) {
          return res.status(200).json({
            message: "Empty Folder",
            status: "success",
            path: directory,
            data: data,
          });
        }

        items.forEach((item) => {
          const uploadDirectory = path.join(__dirname, "..", "..");
          const absolute = path.join(PublicDirectory, item);
          const itemPath = absolute.substring(uploadDirectory.length);
          fs.stat(absolute, (err, stats) => {
            if (err) {
              return res.status(500).json({
                message: "Error retrieving file stats",
                status: "error",
                error: err.message,
              });
            }

            const sanitizedPath = itemPath.replace(/\\/g, "/");

            if (stats.isDirectory()) {
              data.push({
                type: "directory",
                name: item,
                path: sanitizedPath,
              });
            } else {
              data.push({
                type: "file",
                name: item,
                path: sanitizedPath,
                extension: path.extname(item),
              });
            }

            if (data.length === items.length) {
              return res.status(200).json({
                message: "Files retrieved successfully",
                status: "success",
                path: directory,
                data: data,
              });
            }
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const createDirectory = (req, res) => {
  const directory = req.params.directory;
  const PublicDirectory = path.join(__dirname, "..", "..", "public", directory);

  const folder = req.body.folderName;
  const folderPath = PublicDirectory + "/" + folder;

  try {
    fs.access(folderPath, (error) => {
      if (error) {
        fs.mkdir(folderPath, { recursive: true }, (error) => {
          if (error) {
            console.log(error);
            return res.status(404).json({
              status: false,
              message: error.message,
            });
          } else {
            console.log("New Directory created successfully !!");
            return res.status(200).json({
              status: true,
              message: "New Directory created successfully !!",
            });
          }
        });
      } else {
        console.log("Given Directory already exists !!");
        return res.status(404).json({
          status: false,
          message: "Given Directory already exists !!",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const uploadFile = (req, res) => {
  const directory = req.params.directory || "";
  const PublicDirectory = path.join(__dirname, "..", "..", "public", directory);

  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, PublicDirectory);
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    const upload = multer({ storage: storage }).single("fileName");

    upload(req, res, function (err) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Error uploading file",
          error: err,
        });
      }

      return res.status(200).json({
        status: true,
        fileDetail: req.file,
        message: "File uploaded successfully",
      });
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteDirectory = (req, res) => {
  const directory = req.params.directory || "";
  const PublicDirectory = path.join(__dirname, "..", "..", "public", directory);

  try {
    if (fs.existsSync(PublicDirectory)) {
      if (fs.lstatSync(PublicDirectory).isFile()) {
        fs.rm(PublicDirectory);
        return res.status(200).json({
          message: "File deleted successfully",
          status: "success",
        });
      } else if (fs.lstatSync(PublicDirectory).isDirectory()) {
        fs.rm(PublicDirectory, { recursive: true });
        return res.status(200).json({
          message: "Folder deleted successfully",
          status: "success",
        });
      } else {
        res.status(404).json({
          message: "Given path not found",
        });
      }
    }
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

// const deleteAll = (req, res) => {
//     const directory = req.params.directory || '';
//     const PublicDirectory = path.join('upload', directory);

//     try {
//         // const items = [req.body.items];
//         const items = Array.isArray(req.body.items) ? req.body.items : [req.body.items];
//         const responses = [];

//         items.forEach(item => {
//             const itemPath = PublicDirectory + '/' + item;

//             if (fs.existsSync(itemPath)) {
//                 if (fs.lstatSync(itemPath).isFile()) {
//                     fs.rm(itemPath);
//                     responses.push({
//                         status: 'success',
//                         message: "File deleted successfully"
//                     });
//                 } else if (fs.lstatSync(itemPath).isDirectory()) {
//                     fs.rm(itemPath, { recursive: true });
//                     responses.push({
//                         status: 'success',
//                         message: "Directory deleted successfully"
//                     });
//                 }
//             } else {
//                 responses.push({
//                     message: "Item not found"
//                 });
//             }
//         });

//         return res.json({
//             data: responses
//         });
//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             message: error.message
//         });
//     }
// }

module.exports = {                                  
  fetchAllFiles,
  createDirectory,
  uploadFile,
  deleteDirectory,
};

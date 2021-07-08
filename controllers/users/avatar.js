const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const tempDir = path.join(process.cwd(), "public/tmp");
const uploadDir = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { fileSize: 1000000 },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

const avatarUpload = async (req, res, next) => {
  const { path: tempName, originalname } = req.file;
  const fileName = path.join(uploadDir, originalname);

  try {
    const { file } = req;
    const img = await jimp.read(file.path);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(file.path);

    await fs.rename(tempName, fileName);
    res.json({
      status: "success",
      code: "200",
      data: {
        result: {
          avatarURL: fileName,
        },
      },
    });
  } catch (error) {
    await fs.unlink(tempName);
    next(error);
  }
};

module.exports = { upload, avatarUpload };

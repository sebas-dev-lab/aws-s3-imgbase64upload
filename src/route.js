const router = require('express').Router();
const imageUpload = require('./s3');

async function controller(req, res) {
  const { img } = req.body;
  const response = await imageUpload(img, 010101);
  console.log(response);
  res.send(response);
}

router.post('/upload', controller);

module.exports = router;

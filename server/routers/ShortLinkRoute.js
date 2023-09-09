const router = require('express').Router();
const { createShortLink, getAllLinks, deleteShortLink } = require('../controllers/shortLink');


router.route("/:userId/shortLink").post(createShortLink).get(getAllLinks);
router.route('/:userId/shortLink/:shortUrl').delete(deleteShortLink);

module.exports = router;
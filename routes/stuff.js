const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');//impératif de placer après auth car si non les images des requetes non authentifiées seront save dans le serv.

const stuffCtrl = require('../controllers/stuff');

router.get('/', auth, stuffCtrl.getAllThings);
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;
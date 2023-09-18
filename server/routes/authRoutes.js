const express = require('express');
const router = express.Router();
const {loginUser, createUser} = require('../controllers/authController');
const { createEvent, viewEvent, updateEvent } = require('../controllers/eventController');
const {checkToken} = require('../middleware/authMiddleware');
const { createEquip, viewEquip, updateEquip } = require('../controllers/EquipController');

router.post('/create', createUser);
router.post('/createEvent',createEvent)
router.put('/updateEvent',checkToken, updateEvent)
router.get('/viewEvent',checkToken, viewEvent)
router.post('/login', loginUser);
// router.post('/create', createUser);
// router.post('/createEvent',createEvent)
// router.put('/updateEvent', updateEvent)
// router.get('/viewEvent', viewEvent)
// router.post('/login', loginUser);
router.post('/createEquip', checkToken, createEquip)
router.get('/viewEquip',checkToken,  viewEquip)
router.put('/updateEquip/:selectedSport',checkToken,  updateEquip)

module.exports = router;


const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');

router.get('/', statesController.getAllStates);
router.get('/:state', statesController.getStateByCode);
router.get('/:state/capital', statesController.getStateCapital);
router.get('/:state/nickname', statesController.getStateNickname);
router.get('/:state/population',statesController.getStatePopulation);
router.get('/:state/admission',statesController.getStateAdmission);
router.get('/:state/funfact',statesController.getRandomFunFact);
router.post('/:state/funfact', statesController.addStateFunFacts);

module.exports = router;
const router = require("express").Router();
const jobController = require("../controllers/jobController");


router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJob);

router.get('/search/:key', jobController.searchJobs);
router.post('/', jobController.createJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);



module.exports = router;
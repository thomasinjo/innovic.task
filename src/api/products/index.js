const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json("list of all products");
});

module.exports = router;

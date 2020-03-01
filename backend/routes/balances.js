const router = require("express").Router();
let Balance = require("../models/balance.model");

router.route("/").get((req, res) => {
  Balance.find()
    .then(balances => res.json(balances))
    .catch(err => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const balance = Number(req.body.balance);
  const date = Date.parse(req.body.date);
  const description = req.body.description;

  const newBalance = new Balance({
    username,
    balance,
    date,
    description
  });
  newBalance
    .save()
    .then(() => res.json("Balance added!"))
    .catch(err => res.status(400).json("Error:" + err));
});

router.route("/:id").get((req, res) => {
  Balance.findById(req.params.id)
    .then(balances => res.json(balances))
    .catch(err => res.status(400).json("Error:" + err));
});

router.route("/:id").delete((req, res) => {
  Balance.findByIdAndDelete(req.params.id)
    .then(() => res.json("Balance Deleted."))
    .catch(err => res.status(400).json("Error:" + err));
});

router.route("/update/:id").post((req, res) => {
  Balance.findById(req.params.id)
    .then(balance => {
      balance.username = req.body.username;
      balance.balance = Number(req.body.balance);
      balance.date = Date.parse(req.body.date);
      balance.description = req.body.description;

      balance
        .save()
        .then(() => res.json("Balance Updated!"))
        .catch(err => res.status(400).json("Error:" + err));
    })
    .catch(err => res.status(400).json("Error:" + err));
});

module.exports = router;

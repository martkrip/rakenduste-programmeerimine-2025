const cats = [
  {
    id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
    name: "Meow",
    createdAt: 1727098800585,
    updatedAt: null,
    deleted: false,
  },
  {
    id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
    name: "Kitty",
    createdAt: 1727098952739,
    updatedAt: null,
    deleted: false,
  },
];
const { validationResult } = require("express-validator");

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name: myName, school } = req.body;
    console.log({ myName });
    res.send({ message: "Cat created"}).sendStatus(201);
};

exports.read = (req, res) => {
    res.send(cats.filter(cat => !cat.deleted));
};

exports.update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id, name: newName } = req.body;

  const cat = cats.find(c => c.id === id && !c.deleted);

  if (newName) cat.name = newName;
  cat.updatedAt = Date.now();

  res.send({ message: "Cat updated", cat}).sendStatus(200)
};

exports.delete = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.body;
  const cat = cats.find(c => c.id === id && !c.deleted);

  cat.deleted = true;
  cat.updatedAt = Date.now();

  res.send({ message: "Cat deleted", cat });
};


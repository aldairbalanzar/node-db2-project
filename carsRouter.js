const express = require('express');
const knex = require('knex');

const knexFile = require('./knexfile');
const db = knex(knexFile.development);

const router = express.Router();

router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
    res.json(cars); 
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve cars.' });
  });
});

router.get('/:id', (req, res) => {
    db('cars')
    .where({ id: req.params.id })
    .first()
    .then(dbData => {
        dbData
        ?res.status(200).json({ data: dbData })
        :res.status(404).json({ message: 'Could not find that vehicles data.'})
    })
    .catch(err => res.status(500).json({ errorMessage: 'error trying to get requested vehicle data.'}))
});

router.post('/', (req, res) => {
    db('cars')
    .insert(req.body)
    .then(ids => {
        const id = ids[0]
        db('cars')
        .where({ id })
        .first()
        .then(dbData => res.status(201).json({ dbData: dbData }))
        .catch(err => res.status(500).json({ errorMessage: 'error sending a response confirmation.' }))
    })
    .catch(err => res.status(500).json({ errorrMessage: 'error trying to create car' }));
});

router.put('/:id', (req, res) => {
    db('cars')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
        count > 0
        ?res.status(200).json({ message: 'Vehicle successfuly updated.' })
        :res.status(404).json({ message: 'could not find that car to delete. '})
    })
    .catch(err => res.status(500).json({ message: 'error trying to delete that vehicle.' }));
});

router.delete('/:id', (req, res) => {
    db('cars')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        count > 0
        ?res.status(200).json({ message: 'Vehicle successfuly deleted.' })
        :res.status(404).json({ message: 'could not find that vehicle to delete. '})
    })
    .catch(err => res.status(500).json({ message: 'error trying to delete that vehicle.' }));
})

module.exports = router;
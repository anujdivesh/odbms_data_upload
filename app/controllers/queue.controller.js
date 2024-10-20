const db = require("../models");
const config = require("../config/auth.config");
const Queue = db.queue;

const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    
    Queue.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Queue."
      });
    });
};

exports.findOrCreate = (req, res) => {
  return Queue.create({
      function: req.body.function,
      filename: req.body.filename,
      full_file_path: req.body.full_file_path,
      enabled: req.body.enabled
    
  })
    .then(data => {
        res.status(200).send({message:'Queue Created.'})
  })
    .catch((err) => {
      res.status(500).send({ message: "An Error Occurred."+err });
      
    });
};

exports.findOne = (req, res) => {

  const countryId = req.params.id
  return Queue.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(404).send({ message: "Queue not found." });
      }
      else{
        res.status(200).send(countryId);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An Error Occurred."+err });
    });
    
};

exports.update = async(req, res) => {
    try{
    const countryId = req.params.id;
    const org = await Queue.findByPk(countryId);
  
    if (!org) {
      return res.status(200).json({ message: 'Queue not found' });
    }
    else{
        Queue.update(
          {
            function: req.body.function,
            filename: req.body.filename,
            full_file_path: req.body.full_file_path,
            enabled: req.body.enabled
        },{
          where:{
            id: req.params.id,
          }
        })
          .then(data => {
            if (data == 1){
              res.status(200).send({message:'Queue updated.'})
            }
            else{
              res.status(200).send({message:'Queue does not exist.'})
            }
        })
    }
  }
  catch(err){
    res.status(500).json({ message: 'Please pass in all the required paramters.' });
  }
  };

exports.destroy = (req,res) => {
  const countryId = req.params.id
  return Queue.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(404).send({ message: "Queue Not found." });
      }
      else{
        Queue.destroy({where:{id:req.params.id}});
        res.status(200).send({ message: "Queue deleted!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An Error Occurred."+err });
    });
};
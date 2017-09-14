const models = require('../../db/models');

models.Lifecycle.create = (req, res, card) => {
  models.Lifecycle.forge({
    status: req.body.status.status,
    status_start_date: req.body.status.date,
    card_id: card.id,
    user_id: req.user.id
  })
    .save()
    .then(result => {
      console.log('lifecycle saved');
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.createIfUpdated = (req, res, card) => {
  models.Lifecycle.forge().where({
    card_id: card.id,
    user_id: req.user.id
  }).fetch()
    .then(lifecycle => {
      if (!lifecycle) {
        throw lifecycle;
      }
      //should compare the updated card's current status with the most recent lifecycle status, create new lifecycle model if it's different --currently creates new lifecycle model regardless
      if (lifecycle.attributes.status !== card.attributes.current_status) {
        return models.Lifecycle.create(req, res, card);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.create = models.Lifecycle.create;
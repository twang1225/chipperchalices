const models = require('../../db/models');
const card = require ('./cards.js');
const lifecycle = require ('./lifecycle.js');
const config = require ('../../config/glassdoor.js');
const Glassdoor = require('node-glassdoor').initGlassdoor({
  partnerId: config.config.partnerId,
  partnerKey: config.config.key
});


models.Company.findOrCreate = function(req, res) {
  var isNew = false;
  var cloned = new models.Company({
    name: req.body.job.company,
    industry: null,
    logo_url: null,
    company_url: null,
    description: null,
    location_id: null,
    rating: null
  });
  return cloned.fetch()
    .then(function(result, err) {
      if (result === null) {
        isNew = true;
        return cloned.save()
          .then(result =>{
            return result;
          })
          .catch(err=>{
            console.log(err);
          });
      }
      return result;
    })
    .then(result => {
      if (isNew) {
        return models.Company.getGlassdoorInfo(req, res, result);
      }
      return result;
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

models.Company.getGlassdoorInfo = function (req, res, company) {
  return Glassdoor.findOneCompany(company.attributes.name,
    {
      country: 'US'
    })
    .then(function (data) {
      return company.save ({
        industry: data.industryName,
        logo_url: data.squareLogo,
        company_url: data.website,
        description: data.featuredReview.headline,
        rating: data.overallRating
      })
        .then(result =>{
          card.create(req, res, result);
        });
    })
    .catch(err => {
      console.error(err);
    });
};

models.Company.getGlassdoorInfoForUpdatedCompany = function (req, res, company) {
  return Glassdoor.findOneCompany(company.attributes.name,
    {
      country: 'US'
    })
    .then(function (data) {
      return company.save ({
        industry: data.industryName,
        logo_url: data.squareLogo,
        company_url: data.website,
        description: data.featuredReview.headline,
        rating: data.overallRating
      });
    })
    .catch(err => {
      console.error(err);
    });
};


module.exports.create = (req, res) => {
  return models.Company.findOrCreate(req, res);
};

module.exports.createIfUpdated = (req, res, result) => {
  return models.Company.forge().where({ name: req.body.job.company}).fetch()
    .then(company => {
      if (!company) {
        console.log('company doesnt exist bleh');
        return models.Company.forge({
          name: req.body.job.company
        }).save()
      }
      return company;
    })
    .then(result => {
      //console.log('new company saved result: ', result.attributes);
      return models.Company.getGlassdoorInfoForUpdatedCompany(req, res, result);
    })
    .then(result => {
      //console.log('after glassdoor results: ', result.attributes);
      return result;
    })
    // .then (result => {
    //   console.log('NEW COMPANY ID: ', result.attributes.id)
    //   // models.Card.forge().where({ company_id: result.attributes.})
    // })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getGlassdoorInfo = models.Company.getGlassdoorInfo;

// module.exports = {
//   getGlassdoorInfo: models.Company.getGlassdoorInfo,
//   getGlassdoorInfoForUpdatedCompany: models.Company.getGlassdoorInfoForUpdatedCompany
// };

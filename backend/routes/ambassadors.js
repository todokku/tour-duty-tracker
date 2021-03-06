const router = require('express').Router();
let Ambassador = require('../models/ambassador.model');

// GET/ ambassadors
router.route('/').get((_, response) => {
    Ambassador.find()
        .then(ambassadors => response.status(200).json({
            "code":"SUCCESS",
            "ambssadors":ambassadors}))
        .catch(error => response.status(400).json({
            "code": "INALID_INPUT",
            "message": `${error}`}));
});

// GET/ ambassadors/{id}
router.route('/:id').get((request, response) => {
    Ambassador.findById(request.params.id)
        .then(ambassador => response.status(200).json({
            "code":"SUCCESS",
            "ambassador":ambassador}))
        .catch(error => response.status(400).json({
            "code": "INVALID_INPUT",
            "message": `${error}`}));
});

// POST/ ambassadors
router.route('/').post((request, response) => {
    //TODO: to confirm details to take note
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const primaryDegree = request.body.primaryDegree;
    const secondaryDegree = request.body.secondaryDegree;
    const batch = request.body.batch;
    const nationality = request.body.nationality;
    const race = request.body.race;
    const year = request.body.year;
    const isAvailable = request.body.isAvailable;
    const unavailabilityReason = request.body.unavailabilityReason;
    const unavailableFrom = request.body.unavailableFrom;
    const unavailableTo = request.body.unavailableTo;
    const isChineseProficient = request.body.isChineseProficient;
    const hasClearedLeadership = request.body.hasClearedLeadership;
    const tourCount = 0;
    const eventCount = 0;

    const ambassador = new Ambassador({
        firstName,
        lastName,
        primaryDegree,
        secondaryDegree,
        batch,
        nationality,
        race,
        year,
        isAvailable,
        unavailabilityReason,
        unavailableFrom,
        unavailableTo,
        isChineseProficient,
        hasClearedLeadership,
        tourCount,
        eventCount
    });

    ambassador.save()
        .then(()=> response.status(201).json({
            "ambassador": ambassador,
            "code" : "ADDED",
            "message": `Ambassador ${firstName} ${lastName} added successfully.`}))
        .catch(error => response.status(400).json({
            "code": "INVALID_INPUT",
            "message": `${error}`}));
});

// PUT/ ambassadors
router.route('/:id').put((request, response) => {
    Ambassador.findById(request.params.id)
        .then(ambassador => {
            ambassador.firstName = request.body.firstName;
            ambassador.lastName = request.body.lastName;
            ambassador.primaryDegree = request.body.primaryDegree;
            ambassador.secondaryDegree = request.body.secondaryDegree;
            ambassador.batch = request.body.batch;
            ambassador.nationality = request.body.nationality;
            ambassador.race = request.body.race;
            ambassador.year = request.body.year;
            ambassador.isAvailable = request.body.isAvailable;
            ambassador.unavailabilityReason = request.body.unavailabilityReason;
            ambassador.unavailableFrom = request.body.unavailableFrom;
            ambassador.unavailableTo = request.body.unavailableTo;
            ambassador.isChineseProficient = request.body.isChineseProficient;
            ambassador.hasClearedLeadership = request.body.hasClearedLeadership;
            ambassador.tourCount = request.body.tourCount;
            ambassador.eventCount = request.body.eventCount;
            
            ambassador.save()
                .then(() => response.status(200).json({
                    "ambassador": ambassador,
                    "code": "UPDATED",
                    "message": `Ambassador ${ambassador.firstName} ${ambassador.lastName} updated successfully.`}))
                .catch(error => response.status(400).json(`message: ${error}`));
        })
        .catch(error => response.status(400).json({
            "code": "INVALID_INPUT",
            "message:": `${error}`}));
});

// DELETE/ ambassadors
router.route('/:id').delete((request, response) => {
    Ambassador.findByIdAndDelete(request.params.id)
        .then(() => response.status(200).json({
            "code": "DELETED",
            "message": `Ambassador has been deleted.`}))
        .catch(error => response.status(400).json({
            "code": "INVALID_INPUT",
            "message": `${error}`}));
});

module.exports = router;
const {ActivityGroup} = require("../models/activitygroup.model");

/* create a new activiy group. */
exports.create = (req, res) => {
    // VALIDATE REQUEST

    if (!req.body) {
        res.status(400).send({
            status: "Failed",
            message: "Content Can Not Be Empty",
        });
    }

    // data 
    const body = new ActivityGroup({
        email: req.body.email,
        title: req.body.title,
    });

    ActivityGroup.create(body, (err, data) => {
        if (err) {
            res.status(500).send({
                status : "Failed",
                message: "Internal Server Error",
            });
        } else {
            res.status(200).send({
                "status" : "Success",
                "message" : "Success",
                "data" : data,
            });
        }

    });
};

// FIND ALL
exports.findAll = (req, res) => {
    ActivityGroup.get((err, data) => {
        if (err) {
            res.status(500).send({
                status: "Failed",
                message: "Internal Server Error",
            });
        } else {
            res.status(200).send({
                "status" : "Success",
                "message" : "Success",
                "data" : data,
            });
        }

    });
}


// FIND ONE
exports.findById = (req, res) => {
    ActivityGroup.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "Failed",
                message : "Internal Server Error",
                data : {},
            });
        }

        if (data) {
            res.status(200).send({
                status: "Success",
                message: "Success",
                data: data,
            });
        } else {
            res.status(404).send({
                status: "Not Found",
                message : `TODO Items with ID ${req.params.id} Not Found`,
                data : {},
            });
        }


    })
};

// UDPATE DATA
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            status: "Failed",
            message : "All Field is Required",
        });
    }
    ActivityGroup.updateById(req.params.id, new ActivityGroup(req.body), (err, data) => {
        if (err) {
            res.status(404).send({
                status: "Not Found",
                message : `Activity Group With ID ${req.params.id} Not Found`,
                data : {},
            });
        } else {
            res.status(200).send({
                status: "Success",
                message: "Success",
                data: data,
            });
        }

    });
};

// REMOVE ACTIVITY GROUP
exports.remove = (req, res) => {
    ActivityGroup.remove(req.params.id, (err, data) => {
        if (err) {
            res.status(404).send({
                status: "Not Found",
                message : `Activity Group With ID ${req.params.id} Not Found`,
                data : {},
            });
        } else {
            res.status(200).send({
                status: "Success",
                message: "Success",
                data: `Activity with ID ${req.params.id} Successfully Deleted`
            });
        }

    });
};


const { TodoItems } = require('../models/todoitems.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            status: "Failed",
            message: "All Field is Required",
        });
    }

    const body = new TodoItems({
        activity_group_id: req.body.activity_group_id,
        title: req.body.title,
        priority: 'very-high',
    });

    TodoItems.create(body, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "Failed",
                message: "Internal Server Error",
            });
        }

        res.status(200).send({
            "status" : "Success",
            "message" : "Success",
            "data" : data,
        });
    });
}

exports.findAll = (req, res) => {
    TodoItems.get((err, data) => {
        if (err) {
            res.status(500).send({
                status: "Failed",
                message: "Internal Server Error",
            });
        }

        res.status(200).send({
            "status" : "Success",
            "message" : "Success",
            "data" : data
        });
    });
}

exports.findById = (req, res) => {
    TodoItems.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(404).send({
                status: "Not Found",
                message: `TODO Items with id ${req.params.id} Not Found`,
                data: {}
            });
        } else {
            res.status(200).send({
                status: "Success",
                message: "Success",
                data: data,
            });
        }

    });
}

// UDPATE DATA
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            status: "Failed",
            message : "All Field is Required",
        });
    }
    TodoItems.updateById(req.params.id, new TodoItems(req.body), (err, data) => {
        if (err) {
            res.status(404).send({
                status: "Not Found",
                message: `TODO Items with ID ${req.params.id} Not Found`,
                data: {},
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
    TodoItems.remove(req.params.id, (err, data) => {
        if (err) {
            res.status(404).send({
                status: "Not Found",
                message: `TODO Items with ID ${req.params.id} Not Found`,
                data: {},
            });
        }

        res.status(200).send({
            status: "Success",
            message: "Success",
            data: `TODO Items with ID ${req.params.id} Successfully Deleted`
        });
    });
};


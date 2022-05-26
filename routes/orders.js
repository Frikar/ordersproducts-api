const express = require('express')
const router = express.Router()
const db = require('../database/db')
const model = require('../models/Orders')


// GET ORDERS
router.get('/', async (req, res) => {
    let selectQuery = 'SELECT * FROM orders';
    db.pool.query(selectQuery, (err, data) => {
        if (err) {
            res.json({
                status: 400,
                message: err
            })
            return;
        }
        if (data.length === 0) {
            res.json({
                status: 404,
                data: "No orders in list"
            })
            return;
        }
        res.json({
            status: 200,
            data: data,
            message: "Order list retrieved successfully"
        })
    });
})

//GET ONE ORDER
router.get('/:id', async (req, res) => {
    let selectQuery = 'SELECT * FROM orders WHERE ?? = ?';
    let query = db.mysql.format(selectQuery, ["IdOrder", req.params.id]);
    db.pool.query(query, (err, data) => {
        if (err) {
            res.json({
                status: 400,
                message: err
            })
            return;
        }
        if (data.length === 0) {
            res.json({
                status: 404,
                message: "Can't find order or order doesn't exist"
            })
            return;
        }
        res.json({
            status: 200,
            data: data[0],
            message: "Order retrieved successfully"
        })
    });
})

// CREATE ORDER
router.post('/', async (req, res) => {
    let createQuery = 'INSERT INTO orders (??) VALUES (?)';
    let values = [
        req.body.id_user,
        req.body.order_number,
        req.body.datetime,
        req.body.provider_name,
        req.body.observation,
        req.body.status
    ];
    let query = db.mysql.format(createQuery, [model, values]);
    db.pool.query(query, (err, data) => {
        if (err) {
            res.json({
                status: 400,
                message: err
            })
            return;
        }
        res.json({
            status: 200,
            id: data.insertId,
            message: "Order added successfully!"
        })
    });
})

// UPDATE ORDER
router.put('/:id', async (req, res) => {
    let updateQuery = '' +
        'UPDATE orders SET IdUser = ?, OrderNumber = ?, DateTime = ?,ProviderName = ?, Observation = ?, Status = ?  WHERE IdOrder = ?';
    let values = [
        req.body.id_user,
        req.body.order_number,
        req.body.datetime,
        req.body.provider_name,
        req.body.observation,
        req.body.status
    ];
    let query = db.mysql.format(updateQuery, [values[0], values[1], values[2], values[3], values[4], values[5], req.params.id]);
    db.pool.query(query, (err, data) => {
        if (err) {
            res.json({
                status: 400,
                message: err
            })
            return;
        }
        res.json({
            status: 200,
            message: "Order updated successfully!"
        })
    });
})

// DELETE ORDER
router.delete('/:id', async (req, res) => {
    let deleteQuery = "DELETE from orders where ?? = ?";
    let query = db.mysql.format(deleteQuery, ["IdOrder", req.params.id]);
    db.pool.query(query,(err, data) => {
        if (err) {
            res.json({
                status: 400,
                message: err
            })
            return;
        }
        res.json({
            status: 200,
            message: "Order deleted successfully"
        })
    });
})

module.exports = router

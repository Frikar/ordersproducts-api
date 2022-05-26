const express = require('express')
const router = express.Router()
const db = require('../database/db')
const model = require('../models/Products')


// GET PRODUCTS
router.get('/', async (req, res) => {
    let selectQuery = 'SELECT * FROM ordersproducts';
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
                data: "No products in list"
            })
            return;
        }
        res.json({
            status: 200,
            data: data,
            message: "Product list retrieved successfully"
        })
    });
})

//GET ONE PRODUCT
router.get('/:id', async (req, res) => {
    let selectQuery = 'SELECT * FROM ordersproducts WHERE ?? = ?';
    let query = db.mysql.format(selectQuery, ["IdOrdersProducts", req.params.id]);
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
                message: "Can't find product or product doesn't exist"
            })
            return;
        }
        res.json({
            status: 200,
            data: data[0],
            message: "Product retrieved successfully"
        })
    });
})

// CREATE PRODUCT
router.post('/', async (req, res) => {
    let createQuery = 'INSERT INTO ordersproducts (??) VALUES (?)';
    let values = [
        req.body.id_order,
        req.body.value_unit,
        req.body.unit,
        req.body.description,
        req.body.sku,
        req.body.quantity,
        req.body.qty_box,
        req.body.weight,
        req.body.product_mark,
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
            message: "Product added successfully!"
        })
    });
})

// UPDATE PRODUCt
router.put('/:id', async (req, res) => {
    let updateQuery = '' +
        'UPDATE ordersproducts SET IdOrder = ?, ValueUnit = ?,  Unit = ?,Description = ?, SKU = ?, Quantity = ?, QtyBox  = ?, Weight = ?, Mark = ?, Status = ?  WHERE IdOrdersProducts = ?';
    let values = [
        req.body.id_order,
        req.body.value_unit,
        req.body.unit,
        req.body.description,
        req.body.sku,
        req.body.quantity,
        req.body.qty_box,
        req.body.weight,
        req.body.product_mark,
        req.body.status
    ];
    let query = db.mysql.format(updateQuery,
        [values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9],
            req.params.id]);
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
            message: "Product updated successfully!"
        })
    });
})

// DELETE PRODUCT
router.delete('/:id', async (req, res) => {
    let deleteQuery = "DELETE from ordersproducts where ?? = ?";
    let query = db.mysql.format(deleteQuery, ["IdOrdersProducts", req.params.id]);
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
            message: "Product deleted successfully"
        })
    });
})

module.exports = router

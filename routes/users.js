const express = require('express')
const router = express.Router()
const db = require('../database/db')


// GET ALL USERS
router.get('/', async (req, res) => {
    let selectQuery = 'SELECT * FROM user';
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
                    message: "No users in list"
                })
                return;
            }
            res.json({
                status: 200,
                data: data,
                message: "User list retrieved successfully"
            })
        }
    )
    ;
})

// GET ONE USER
router.get('/:userId', async (req, res) => {
    let selectQuery = 'SELECT * FROM user WHERE ?? = ?';
    let query = db.mysql.format(selectQuery, ["IdUser", req.params.userId]);
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
                message: "Can't find user or user doesn't exist"
            })
            return;
        }
        res.json({
            status: 200,
            data: data[0],
            message: "User retrieved successfully"
        })
    });
})

module.exports = router

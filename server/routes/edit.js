const express = require('express');
const route = express.Router();
const mail = require('../config/mail');
const path = require("path");
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { UserLoggin, AvoidIndex, AdminRoleBased } = require('../auth/auth');
const random = Math.floor(Math.random() * 99999);
const rando = Math.floor(Math.random() * 99999);
const rand = rando + "FTL" + random;

// username, surname, othername, phone_number, address


// To Update Surname 
route.post('/surname', UserLoggin, async (req, res) => {
    //  
    const { surname } = req.body;
    if (surname) {
        try {
            const userData = req.app.get('userData');
            let updateUsername = 'UPDATE bkew76jt01b1ylysxnzp.ft_accounts SET surname = ?  WHERE email = ?';
            let values = [surname, userData.email];

            db.query(updateUsername, values, (error, result) => {
                if (error) {
                    console.log('An Update Error Occurred ', error);
                    res.status(500).send({ message: 'An Update Error Occurred' });
                }
                console.log('Updated successfully !', result)
                const sqlGetUserWithAccount = `
            SELECT 
                u.user_id,
                u.password,
                u.email,
                u.role,
                a.account_id,
                a.total_spent,
                a.account_balance,
                a.phone_number,
                a.surname,
                a.othername,
                a.username,
                a.address,
                a.email as account_email
            FROM fasttrac.users u
            LEFT JOIN bkew76jt01b1ylysxnzp.ft_accounts a ON u.user_id = a.user_id
            WHERE u.email = ?;
            `;
                db.query(sqlGetUserWithAccount, [userData.email], async (error, result) => {
                    if (error) {

                        return res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    }

                    if (result.length === 0) {
                        return res.status(401).json({
                            message: 'Invalid Data or Fields'
                        });
                    }

                    delete userData
                    req.app.set('userData', result[0])
                    const userWithAccount = result[0];
                    res.clearCookie('user');
                    res.cookie('user', JSON.stringify(userWithAccount));
                    res.redirect('/user/profile');

                });

            });
        } catch (err) {
            console.error('Error Loading Update:', err);
            res.status(500).send('Error Loading Update');
        }
    } else {
        res.redirect('/user/edit');
    }
});

// To Update Username
route.post('/username', UserLoggin, async (req, res) => {
    //  
    const { username } = req.body;
    if (username) {
        try {
            const userData = req.app.get('userData');
            let updateUsername = 'UPDATE bkew76jt01b1ylysxnzp.ft_accounts SET username = ?  WHERE email = ?';
            let values = [username, userData.email];

            db.query(updateUsername, values, (error, result) => {
                if (error) {
                    console.log('An Update Error Occurred ', error);
                    res.status(500).send({ message: 'An Update Error Occurred' });
                }
                console.log('Updated successfully !', result)
                const sqlGetUserWithAccount = `
            SELECT 
                u.user_id,
                u.password,
                u.email,
                u.role,
                a.account_id,
                a.total_spent,
                a.account_balance,
                a.phone_number,
                a.surname,
                a.othername,
                a.username,
                a.address,
                a.email as account_email
            FROM fasttrac.users u
            LEFT JOIN fasttrac.accounts a ON u.user_id = a.user_id
            WHERE u.email = ?;
            `;
                db.query(sqlGetUserWithAccount, [userData.email], async (error, result) => {
                    if (error) {

                        return res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    }

                    if (result.length === 0) {
                        return res.status(401).json({
                            message: 'Invalid Data or Fields'
                        });
                    }

                    delete userData
                    req.app.set('userData', result[0])
                    const userWithAccount = result[0];
                    res.clearCookie('user');
                    res.cookie('user', JSON.stringify(userWithAccount));
                    res.redirect('/user/profile');

                });

            });
        } catch (err) {
            console.error('Error Loading Update:', err);
            res.status(500).send('Error Loading Update');
        }
    } else {
        res.redirect('/user/edit');
    }
});

// To Update Other Name 
route.post('/other', UserLoggin, async (req, res) => {
    //  
    const { othername } = req.body;
    if (othername) {
        try {
            const userData = req.app.get('userData');
            let updateUsername = 'UPDATE fasttrac.accounts SET othername = ?  WHERE email = ?';
            let values = [othername, userData.email];

            db.query(updateUsername, values, (error, result) => {
                if (error) {
                    console.log('An Update Error Occurred ', error);
                    res.status(500).send({ message: 'An Update Error Occurred' });
                }
                console.log('Updated successfully !', result)
                const sqlGetUserWithAccount = `
                SELECT 
                    u.user_id,
                    u.password,
                    u.email,
                    u.role,
                    a.account_id,
                    a.total_spent,
                    a.account_balance,
                    a.phone_number,
                    a.surname,
                    a.othername,
                    a.username,
                    a.address,
                    a.email as account_email
                FROM fasttrac.users u
                LEFT JOIN fasttrac.accounts a ON u.user_id = a.user_id
                WHERE u.email = ?;
                `;
                db.query(sqlGetUserWithAccount, [userData.email], async (error, result) => {
                    if (error) {

                        return res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    }

                    if (result.length === 0) {
                        return res.status(401).json({
                            message: 'Invalid Data or Fields'
                        });
                    }

                    delete userData
                    req.app.set('userData', result[0])
                    const userWithAccount = result[0];
                    res.clearCookie('user');
                    res.cookie('user', JSON.stringify(userWithAccount));
                    res.redirect('/user/profile');

                });

            });
        } catch (err) {
            res.status(500).send('Error Loading Update');
        }
    } else {
        // Send Error Message For Empty Input
        res.redirect('/user/edit');
    }
});

// To Update Phone Number 
route.post('/phone_number', UserLoggin, async (req, res) => {
    //  
    const { phone_number } = req.body;
    if (phone_number) {
        try {
            const userData = req.app.get('userData');
            let updateUsername = 'UPDATE fasttrac.accounts SET phone_number = ?  WHERE email = ?';
            let values = [phone_number, userData.email];

            db.query(updateUsername, values, (error, result) => {
                if (error) {
                    console.log('An Update Error Occurred ', error);
                    res.status(500).send({ message: 'An Update Error Occurred' });
                }
                console.log('Updated successfully !', result)
                const sqlGetUserWithAccount = `
            SELECT 
                u.user_id,
                u.password,
                u.email,
                u.role,
                a.account_id,
                a.total_spent,
                a.account_balance,
                a.phone_number,
                a.surname,
                a.othername,
                a.username,
                a.address,
                a.email as account_email
            FROM fasttrac.users u
            LEFT JOIN fasttrac.accounts a ON u.user_id = a.user_id
            WHERE u.email = ?;
            `;
                db.query(sqlGetUserWithAccount, [userData.email], async (error, result) => {
                    if (error) {

                        return res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    }

                    if (result.length === 0) {
                        return res.status(401).json({
                            message: 'Invalid Data or Fields'
                        });
                    }

                    delete userData
                    req.app.set('userData', result[0])
                    const userWithAccount = result[0];
                    res.clearCookie('user');
                    res.cookie('user', JSON.stringify(userWithAccount));
                    res.redirect('/user/profile');

                });

            });
        } catch (err) {
            console.error('Error Loading Update:', err);
            res.status(500).send('Error Loading Update');
        }
    } else {
        res.redirect('/user/edit');
    }
});

// To Update Address 
route.post('/address', UserLoggin, async (req, res) => {
    //  
    const { address } = req.body;
    if (address) {
        try {
            const userData = req.app.get('userData');
            let updateUsername = 'UPDATE fasttrac.accounts SET address = ?  WHERE email = ?';
            let values = [address, userData.email];

            db.query(updateUsername, values, (error, result) => {
                if (error) {
                    console.log('An Update Error Occurred ', error);
                    res.status(500).send({ message: 'An Update Error Occurred' });
                }
                console.log('Updated successfully !', result)
                const sqlGetUserWithAccount = `
                SELECT 
                    u.user_id,
                    u.password,
                    u.email,
                    u.role,
                    a.account_id,
                    a.total_spent,
                    a.account_balance,
                    a.phone_number,
                    a.surname,
                    a.othername,
                    a.username,
                    a.address,
                    a.email as account_email
                FROM fasttrac.users u
                LEFT JOIN fasttrac.accounts a ON u.user_id = a.user_id
                WHERE u.email = ?;
                `;
                db.query(sqlGetUserWithAccount, [userData.email], async (error, result) => {
                    if (error) {

                        return res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    }

                    if (result.length === 0) {
                        return res.status(401).json({
                            message: 'Invalid Data or Fields'
                        });
                    }

                    delete userData
                    req.app.set('userData', result[0])
                    const userWithAccount = result[0];
                    res.clearCookie('user');
                    res.cookie('user', JSON.stringify(userWithAccount));
                    res.redirect('/user/profile');

                });

            });
        } catch (err) {
            console.error('Error Loading Update:', err);
            res.status(500).send('Error Loading Update');
        }
    } else {
        res.redirect('/user/edit');
    }
});

// To Update Password 
// Make the password edit send a mail to the Email 
route.post('/password', UserLoggin, async (req, res) => {
    //  
    const { old_password , new_password } = req.body;
    if (password) {
        try {
            const userData = req.app.get('userData');
            let updateUsername = 'UPDATE fasttrac.accounts SET password = ?  WHERE email = ?';
            let values = [password, userData.email];

            db.query(updateUsername, values, (error, result) => {
                if (error) {
                    console.log('An Update Error Occurred ', error);
                    res.status(500).send({ message: 'An Update Error Occurred' });
                }
                const messages = {
                        from: {
                            name: 'FASTTRAC INTERNATIONAL',
                            address: 'felixtemidayoojo@gmail.com',
                        },
                        to: userData.email,
                        subject: "FASTTRAC LOGISTICS",
                        text: `Dear Esteemed User ${userData.username}, \n \n Your New Password is \n <h1> ${new_password} </h1> . \n \n Your FASTTRAC Account Password has been changed successfully . \n \n Ensure that Your Password is kept safe. Incase of any compromise, ensure you change or optimize the security on your application. \n \n Contact our admin if need arises.`,
                    }
                    mail.sendIt(messages)
                console.log('Password Updated successfully !', result)
                res.redirect('/user/logout')

            });
        } catch (err) {

            res.status(500).send('Error Loading Update');
        }
    } else {
        res.json('Field is Empty !')
        // res.redirect('/user/profile');
    }
});




module.exports = route;

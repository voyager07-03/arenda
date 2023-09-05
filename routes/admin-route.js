const express = require('express');
const admin = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');
const upload = require('../middleware/upload');


admin.get('/login', (req, res) => {
  res.render('login.ejs');
});
admin.post('/login', adminController.login)
admin.post('/create-post', upload.fields([{ name: 'mainImg', maxCount: 1 }, { name: 'otherImg', maxCount: 4 }]), adminController.addPost);
admin.post('/add-data', adminController.addData);

admin.delete('/api/posts/:id',adminController.deletePost);
admin.patch("/api/posts/:id/change-status", adminController.changeStatus);
admin.get('/api/posts/edit/:id', adminController.editPost);


module.exports = admin;
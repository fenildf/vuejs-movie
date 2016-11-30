var express = require('express');
var router = express.Router();

//TODO 得到movieModel cateModel

//得到所有的movies
router.get('/movies', function(req, res, next) {

});

//得到某部电影的详情信息
router.get('/movie/:id', function(req, res, next) {

});

//添加电影的详情信息
router.post('/movie/add', function(req, res, next) {

});

//更新某部电影详情
router.post('/movie/:id/edit', function(req, res, next) {

});

//删除某部电影
router.post('/movie/:id/del', function(req, res, next) {

});
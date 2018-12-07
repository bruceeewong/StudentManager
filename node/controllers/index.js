const db = require('../database');
const fs = require('mz/fs');
const path = require('path');



const fn_index = async (ctx, next) => {

    let fpath = path.join(__dirname, '../../');

    ctx.response.type = 'text/html';
    ctx.response.body = await fs.readFile(fpath + 'index.html');
};

const fn_findAllStudents = async (ctx, next) => {
    let students = await db.findAllStudents();
    ctx.response.body = JSON.stringify(students);
};

const fn_addStudent = async (ctx, next) => {

    let stu = {};
    stu = Object.assign(stu, ctx.request.body);

    let result = db.insertStudent(stu);

    if (result) {
        ctx.response.status = 200;
        ctx.response.body = 'insert stu success';
    } else {
        ctx.response.status = 400;
        ctx.response.body = 'insert stu failed';
    }

};

const fn_modifyStudent = async (ctx, next) => {

    let stu = {};
    stu = Object.assign(stu, ctx.request.body);


    let result = db.modifyStudent(stu);

    if (result) {
        ctx.response.status = 200;
        ctx.response.body = 'modify stu success';
    } else {
        ctx.response.status = 400;
        ctx.response.body = 'modify stu failed';
    }

};

const fn_deleteStudent = async (ctx, next) => {
    let {id} = ctx.request.body;

    let result = db.deleteStudent(id);

    if (result) {
        ctx.response.status = 200;
        ctx.response.body = 'delete stu success';
    } else {
        ctx.response.status = 400;
        ctx.response.body = 'delete stu failed';
    }

};

module.exports = {
    'GET /': fn_index,
    'GET /students': fn_findAllStudents,
    'POST /addStudent': fn_addStudent,
    'POST /modifyStudent': fn_modifyStudent,
    'POST /deleteStudent': fn_deleteStudent
};
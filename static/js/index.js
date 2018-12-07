// index.js

class Student {
    constructor(id = '-1',sname = 'default', sgender = 'male', snum = '-1',
                sschool = '', smajor = '', sclass = '', stime = '2000-09-01') {
        this.id = id;
        this.sname = sname;
        this.sgender = sgender;
        this.snum = snum;
        this.sschool = sschool;
        this.smajor = smajor;
        this.sclass = sclass;
        this.stime = stime;
    }
}

let globalStudents = [];

function refresh(data) {

    let
        students = JSON.parse(data),
        stu;

    globalStudents = [];

    students.forEach((s) => {
        stu = new Student(s.id, s.sname, s.sgender, s.snum, s.sschool, s.smajor, s.sclass, s.stime);
        globalStudents.push(stu);
    });

    stuList.students = globalStudents;

}

function findAll() {
    $.ajax({
        type: "GET",
        url: "http://120.79.15.25:3000//students",
        success: (data) => {
            refresh(data);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function insertStu(event) {

    // event.preventDefault();
    $.ajax({
        type: "POST",
        url: "http://120.79.15.25:3000/addStudent",
        data: $('#stuInfo').serialize(),
        dataType: "text",
        success: (data) => {
            findAll();
            alert("添加学生成功!");
        },
        error: (error) => {
            alert("添加学生失败:" + error);
        }
    });
}

function modifyStu(event) {

    event.preventDefault();

    $.ajax({
        type: "POST",
        url: "http://120.79.15.25:3000/modifyStudent",
        data: $('#modifyStuForm').serialize(),
        success: (data) => {
            alert("修改成功!");
            findAll();
        },
        error: (error) => {
            alert('修改失败: ' + error);
            console.log(error);
        }
    });
    $('#modifyStuModal').modal('hide');

}

function deleteStu(id) {

    let data = {
        id: id
    };

    $.ajax({
        type: "POST",
        url: "http://120.79.15.25:3000/deleteStudent",
        data: data,
        success: () => {
            alert('删除成功!');
            findAll();
        },
        error: (error) => {
            alert("删除失败! " + error);
            console.log(error);
        }
    })
}

window.addEventListener('load', findAll());

$('#addStuBtn').on('click', (e) => {
    insertStu(e);
});

$('#comfirmModifyBtn').on('click', (e) => {
    modifyStu(e);
});

var stuList = new Vue({
    el: '#stu-list',
    data: {
        students: {}
    },
    methods: {
        v_modifyStu: function (index) {
            $('#modifyStuModal').modal('show');
            let s = globalStudents[index];

            $('#snameModal').val(s.sname);
            $('#modifyStuForm input:radio[value='+ s.sgender +']').prop('checked', 'checked');
            $('#snumModal').val(s.snum);
            $('#sschoolModal').val(s.sschool);
            $('#smajorModal').val(s.smajor);
            $('#sclassModal').val(s.sclass);
            $('#stimeModal').val(s.stime);
            $('#modifyIdModal').val(s.id);
        },
        v_deleteStu: function (id) {
            deleteStu(id);
        }
    }
});
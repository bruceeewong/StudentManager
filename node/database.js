const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var Student = sequelize.define('students', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    snum: Sequelize.STRING(16),
    sname: Sequelize.STRING(16),
    sgender: Sequelize.STRING(8),
    sschool: Sequelize.STRING(16),
    sclass: Sequelize.STRING(16),
    smajor: Sequelize.STRING(16),
    stime: Sequelize.STRING(16),
}, {
    timestamps: false
});

const findAllStudents = async () => {
    var students = await Student.findAll();
    console.log(`find ${students.length} students:`);
    return students;
};


const insertStudent = async (stu) => {

    try {
        var _stu = await Student.create(stu);
        console.log('created: ' + JSON.stringify(_stu));
        return true;

    } catch (e) {
        console.log('insert stu failed:' + e);
        return false;
    }
};

const modifyStudent = async (stu) => {

    let list = await Student.findAll({
        where: {
            id: stu.id
        }
    });

    let s = list[0];

    for (let i in s.dataValues) {

        if (s[i] !== stu[i]) {
            s[i] = stu[i];
        }
    }

    try {
        await s.save();
        return true;
    } catch (e) {
        console.log('update stu failed:' + e);
        return false;
    }
};

const deleteStudent = async (id) => {
  let list = await Student.findAll({
      where: {
          id: id
      }
  });

  let s = list[0];

  try {
      await s.destroy();
      return true;
  } catch (e) {
      console.log('delete stu failed:' + e);
      return false;
  }



};

module.exports = {
    findAllStudents,
    insertStudent,
    modifyStudent,
    deleteStudent
};
const Student = require('./Student');

class Group extends Array {
    constructor(...students) {
        super();
        this.students = [];
        for(let student of students) {
            if(Array.isArray(student)) {
                // TODO: check if obj in array instance of Student
                this.students = this.students.concat(...student);
            } else if (student instanceof Student) this.students.push(student);
        }
    }

    addStudent(student) {
        if(student instanceof Student) {
            this.students.push(student);
            return "Студент добавлен в группу";
        } else return "Этот студент не может быть добавлен в группу";
    }

    removeStudent(student) {
        if(student instanceof Student) {
            const studentIndex = this.students.findIndex( st => st === student);
            if(studentIndex >= 0) {
                this.students.splice(studentIndex, 1);
                return "Студент удален с группы";
            } else return "Студент в группе не найден";
        } else return "Этот студент не находиться в группе";
    }

    attendance(surname = null) {
        if(!surname) {
            const attendanceOnLesson = this.students.reduce( (acc, student) => {
                return acc + student.averageAttend();
            }, 0);
            return attendanceOnLesson / this.students.length;
        } else {
            const attendanceRating = this.students.map( st => {
                return {
                    name: st.name,
                    surname: st.surname,
                    avr: st.averageAttend()
                }
            });
            attendanceRating.sort( (a, b) => {
                return b.avr - a.avr; // descend sort
            });
            const studentRatingIndex = attendanceRating.findIndex(st => st.surname === surname) + 1;
            return studentRatingIndex > 0 ? studentRatingIndex : "Студента с такой фамилией нет в этой группе";
        }
    }

    performance(surname = null) {
        if(!surname) {
            const performanceOnLesson = this.students.reduce( (acc, student) => {
                return acc + student.average();
            }, 0);
            return performanceOnLesson / this.students.length;
        } else {
            const performanceRating = this.students.map( st => {
                return {
                    name: st.name,
                    surname: st.surname,
                    avr: st.average()
                }
            });
            performanceRating.sort( (a, b) => {
                return b.avr - a.avr; // descend sort
            });
            const studentRatingIndex = performanceRating.findIndex(st => st.surname === surname) + 1;
            return studentRatingIndex > 0 ? studentRatingIndex : "Студента с такой фамилией нет в этой группе";
        }
    }
}

module.exports = Group;
function Student (name, surname, born) {
    this.name = name;
    this.surname = surname;
    this.born = born;
    this.AttendeCounter = 0;
    this.PointsCounter = 0;
    this.attend = new Array(25);
    this.points = new Array(25);
}

Student.prototype = {
    constructor: Student,
    age: function () {
        return new Date().getFullYear() - this.born;
    },
    addPoint: function(point) {
        if(this.PointsCounter <= 25 && typeof (point) === "number" && point <= 100) {
            this.points[this.PointsCounter] = point;
            this.PointsCounter++;
        } else return "Неверная оценка";
    },
    average: function() {
        const present = this.points.reduce( (previousValue, currentValue) => {
            return previousValue + (currentValue || 0);
        }, 0);
        return present / (this.PointsCounter || 1);
    },
    present: function() {
        if(this.AttendeCounter <= 25) {
            this.attend[this.AttendeCounter] = true;
            this.AttendeCounter++;
        }
    },
    absent: function() {
        if(this.AttendeCounter <= 25) {
            this.attend[this.AttendeCounter] = false;
            this.AttendeCounter++;
        }
    },
    averageAttend: function () {
        const present = this.attend.reduce( (previousValue, currentValue) => {
            return previousValue + !!currentValue;
        }, 0);
        return present / (this.AttendeCounter || 1);
    },
    summary: function() {
        const averageRating = this.average();
        const averageAttendance = this.averageAttend();
        if(averageAttendance >= 0.9 && averageRating > 90) return "Ути какой молодчинка!";
        else if ((averageAttendance >= 0.9 && averageRating < 90) || (averageAttendance < 0.9 && averageRating > 90)) return "Норм, но можно лучше";
        else return "Редиска!";
    }
};

module.exports = Student;
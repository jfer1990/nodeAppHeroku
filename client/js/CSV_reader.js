"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cryp = __importStar(require("crypto"));
var fs = __importStar(require("fs-extra"));
var _a = cryp.generateKeyPairSync("rsa", {
    // The standard secure default length for RSA keys is 2048 bits
    modulusLength: 2048,
}), publicKey = _a.publicKey, privateKey = _a.privateKey;
var data = "my secret data";
var encryptedData = cryp.publicEncrypt({
    key: publicKey,
    padding: cryp.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
}, 
// We convert the data string to a buffer using `Buffer.from`
Buffer.from(data));
// The encrypted data is in the form of bytes, so we print it in base64 format
// so that it's displayed in a more readable form
console.log("encypted data: ", encryptedData.toString("base64"));
var decryptedData = cryp.privateDecrypt({
    key: privateKey,
    // In order to decrypt the data, we need to specify the
    // same hashing function and padding scheme that we used to
    // encrypt the data in the previous step
    padding: cryp.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
}, encryptedData);
// The decrypted data is of the Buffer type, which we can convert to a
// string to reveal the original data
console.log("decrypted data: ", decryptedData.toString());
var CSV_Parser = /** @class */ (function () {
    function CSV_Parser(filePath) {
        this.filePath = filePath;
        this.numberOfLines = this.countLines();
        var contentFile = fs.readFileSync('alumnos.csv', { encoding: 'utf-8', flag: 'r' });
        var separator = new RegExp(/\r\n/g || '');
        this.rows = contentFile.split(separator);
    }
    CSV_Parser.prototype.countLines = function () {
        var fileContent = fs.readFileSync('alumnos.csv', { encoding: 'utf-8', flag: 'r' });
        return (fileContent.match(/\n/g) || '').length + 1;
    };
    CSV_Parser.prototype.getRows = function () {
        var rowsWithColumns = new Array();
        var separator = new RegExp(',');
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            var currentColumns = row.split(separator);
            rowsWithColumns.push(currentColumns);
        }
        return rowsWithColumns;
    };
    return CSV_Parser;
}());
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, id) {
        var _this = _super.call(this, name) || this;
        _this.id = id;
        return _this;
    }
    return Student;
}(Person));
var csvFilePath = 'alumnos.csv';
var exampleCsv = new CSV_Parser(csvFilePath);
var studentsInCSV = exampleCsv.getRows();
var students = new Array();
for (var _i = 0, studentsInCSV_1 = studentsInCSV; _i < studentsInCSV_1.length; _i++) {
    var student = studentsInCSV_1[_i];
    var name_1 = student[0];
    var id = student[1];
    students.push(new Student(name_1, id));
}
for (var _b = 0, students_1 = students; _b < students_1.length; _b++) {
    var currentStudent = students_1[_b];
    console.log(currentStudent.name);
}
var tableHtml = document.getElementById('students-table');
var th_name = document.createElement('th');
th_name.append(document.createTextNode('Nombre'));
var th_id = document.createElement('th');
th_id.append(document.createTextNode('Matricula'));
var th_cal = document.createElement('th');
th_cal.append(document.createTextNode('Calificacion'));
var thead = document.createElement('thead');
thead.appendChild(th_name);
thead.appendChild(th_id);
thead.appendChild(th_cal);
tableHtml.appendChild(thead);


import { table } from 'console';
import * as cryp from 'crypto';
import * as fs from 'fs-extra';

const { publicKey, privateKey}= cryp.generateKeyPairSync("rsa", {
    // The standard secure default length for RSA keys is 2048 bits
    modulusLength: 2048,
  });


const data:String = "my secret data";

const encryptedData:Buffer = cryp.publicEncrypt(
  {
    key: publicKey,
    padding: cryp.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  // We convert the data string to a buffer using `Buffer.from`
  Buffer.from(data)
);

// The encrypted data is in the form of bytes, so we print it in base64 format
// so that it's displayed in a more readable form
console.log("encypted data: ", encryptedData.toString("base64"));
const decryptedData:Buffer = cryp.privateDecrypt(
    {
      key: privateKey,
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: cryp.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedData
  );
  
  // The decrypted data is of the Buffer type, which we can convert to a
  // string to reveal the original data
  console.log("decrypted data: ", decryptedData.toString());




class CSV_Parser{
    filePath:string;
    numberOfLines:Number; 
    rows:string[]; 

    constructor(filePath:string){
        this.filePath = filePath; 
        this.numberOfLines = this.countLines();
        let contentFile = fs.readFileSync('alumnos.csv',{encoding:'utf-8',flag:'r'});    
        let separator = new RegExp(/\r\n/g || ''); 
        this.rows = contentFile.split(separator); 

    }
    countLines():Number{
        let fileContent:string = fs.readFileSync('alumnos.csv',{encoding:'utf-8',flag:'r'});
        return (fileContent.match(/\n/g) || '').length + 1;   
    }
    getRows():Array<Array<string>>{
      let rowsWithColumns: Array<Array<string>> = new Array(); 
      let separator = new RegExp(','); 
      for(let row of this.rows){
        let currentColumns:Array<string>  = row.split(separator); 
        rowsWithColumns.push(currentColumns); 
      }
      return rowsWithColumns; 
    }

}
class Person{
  name:string;
  constructor(name:string){
    this.name = name; 
  }
}
class Student extends Person{
  id:string;  
  constructor(name:string, id:string) {
    super(name); 
    this.id = id; 
  }
}


let csvFilePath:string = 'alumnos.csv';
let exampleCsv = new CSV_Parser(csvFilePath); 
let studentsInCSV = exampleCsv.getRows(); 
let students: Array<Student> = new Array(); 

for(let student of studentsInCSV){
  let name = student[0]; 
  let id = student[1]; 
  students.push(new Student(name,id)); 

}
for(let currentStudent of students){
  console.log(currentStudent.name); 
}


let tableHtml:HTMLTableElement = document.getElementById('students-table') as HTMLTableElement; 

let th_name = document.createElement('th'); 
th_name.append(document.createTextNode('Nombre'));

let th_id = document.createElement('th') ; 
th_id.append(document.createTextNode('Matricula'));

let th_cal = document.createElement('th');
th_cal.append(document.createTextNode('Calificacion'));

let thead = document.createElement('thead'); 
thead.appendChild(th_name); 
thead.appendChild(th_id);
thead.appendChild(th_cal);
tableHtml.appendChild(thead);






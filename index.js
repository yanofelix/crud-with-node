const mysql = require('mysql')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'EmployeeDB'
})

mysqlConnection.connect(err => {
    if(!err){
        console.log('DB connection succeded')
    }
    else{
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2))
    }
})

app.listen(3000, ()=> {
    console.log('Express Server is Running at port 3000')
})

app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employe', (err, rows, fields)=> {
        if(!err){
            console.log(rows)
        }
        else{
            console.log(err)
        }
    })
})
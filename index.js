const mysql = require('mysql')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'EmployeeDB',
    multipleStatements: true
})

mysqlConnection.connect(err => {
    if(!err){
        console.log('DB connection succeded as '+ mysqlConnection.threadId)
    }
    else{
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2))
    }
})

app.listen(3000, ()=> {
    console.log('Express Server is Running at port 3000')
})

// get all
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employe', (err, rows, fields)=> {
        if(!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
})

//get one
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employe WHERE EmpID = ?',[req.params.id], (err, rows, fields)=> {
        if(!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
})

//delete
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employe WHERE EmpID = ?',[req.params.id], (err, rows, fields)=> {
        if(!err){
            res.send(`${req.params.id} Deleted successfully`)
        }
        else{
            console.log(err)
        }
    })
})

//insert
app.post('/employees', (req, res) => {
    let emp = req.body
    const sql = 'SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?;  \
        CALL EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary);'
    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields)=> {
        if(!err){
            rows.forEach(element => {
                if(element.constructor == Array) res.send('Inserted'+ element[0].EmpID)
            });
        }
        else{
            console.log(err)
        }
    })
})

//update
app.put('/employees', (req, res) => {
    let emp = req.body
    const sql = 'SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?;  \
        CALL EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary);'
    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields)=> {
        if(!err){
            res.send('Update Successfully')
        }
        else{
            console.log(err)
        }
    })
})
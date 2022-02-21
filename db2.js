const mysql=require('mysql2');
const express=require('express');
var app=express();
const parser=require('body-parser');
app.use(parser.json()); 
var connection=mysql.createConnection(
{
    host:'localhost',
    user:'root',
    password:'MCA14952591',
    database: 'sys'
});
connection.connect((err)=>
{
    if(!err)
    console.log('database connected.');
    else
    console.log('Error');
});
app.listen(5700, ()=>console.log('Server has started.'));
app.get('/Manager/:ID', (req, res)=>
{
    connection.query('Select *from Manager where Manager.ID=?', [req.params.ID],(err, rows, fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log("error");
    })
})
app.get('/add', (req, res)=>
{
    var post={ID:11, ManagerFirstName:'Malavika', LastName: 'Nair', PhoneNumber:'98898', EMAIL: 'malavika.nair@gmail.com', Address: "BG Road" };
    var sql='INSERT into Manager set ?';
    var query = connection.query(sql, post,(err,result)=>
    {
        if(err) throw err;
        res.send("Inserted Rows.")
    })
});
app.get('/update/:ID', (req, res)=>
{
    var ManagerFirstName1="Puneet"
    var sql=`update Manager set ManagerFirstName='${ManagerFirstName1}' where Manager.ID=${req.params.ID}`;
    var query = connection.query(sql,(err,result)=>
    {
        if(err) throw err;
        res.send("Updated data.")
    })
});
app.get('/delete/:ID', (req, res)=>
{
    var sql=`DELETE from Manager where Manager.ID=${req.params.ID}`;
    var query = connection.query(sql,(err,result)=>
    {
        if(err) throw err;
        res.send("Deleted Rows.")
    })
});
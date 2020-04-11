
/*jshint esversion: 6 */

const express= require('express');
const uuid = require('uuid');
const body_parser= require('body-parser');
const fs= require('fs');
const path = require('path');


const app = express();


app.use(express.static('./tous'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

// app.set('views', './views/pages');
app.set('view engine','ejs');


let list =[];
let currentList =[];

let jsonStudents =fs.readFileSync('data.json');
list=JSON.parse(jsonStudents);




app.get('/AddStudent',function(req,res){

    var d = new Date(); 
          
    
    
    // console.log(list);
    
    res.render('add',{y1 : d.getFullYear(), y2 :d.getFullYear() +1});
});


// // Add Student   //
app.post('/AddStudent',(req,res)=>{


    for(var i in list){
        if(list[i].name === req.body.className){
        list[i].classList.push({
            id : uuid.v4(),
            firstName :  req.body.firstName,
            lastName : req.body.lastName,
            address : req.body.Address,
            city : req.body.City,
            dateOfBirth : req.body.dateOfBirth,
            gender : req.body.gender,
            guardian : req.body.guardian,
            phone : req.body.phone,
            classNane : req.body.classNane,
            dateOfRegistration : req.body.dateOfRegistration
            });
        }
    }
    //console.log('list' +JSON.stringify(list));
    fs.writeFile('data.json',JSON.stringify(list),(err)=>{
    console.log(err);
});
res.render('add');
});




// Show level list --------------------


app.get('/Level/:name', function(req, res){
    var  lName =req.params.name;
    
    for (let i = 0; i < list.length; i++) {

        if (list[i].name == lName) {

            currentList = list[i].classList;
        }
    }

    // console.log(lName);
    res.render('show',{name :lName,currentList}); 
});




// ----------------------------------delete element -------------------


app.get('/delete/Level/:name/:id', (req, res) => {
    
    const  id = req.params.id;
    const name = req.params.name;

    
    // console.log('req.params' + req.params);
    let  tmp = [];

    for (let i = 0; i < list.length; i++) {

        if (list[i].name == name) {

            for (let j = 0; j < list[i].classList.length; j++) {

                if (id !== list[i].classList[j].id ) {

                    tmp.push(list[i].classList[j]);
                    
                }
                
            }
            
        }

        
        
    }

    for (let i = 0; i < list.length; i++) {
        if (list[i].name == name) {
            list[i].classList = tmp;
            
        }
        
    }
    fs.writeFileSync('data.json', JSON.stringify(list, null, 4));
    res.redirect('/Addstudent');
    
});


app.get('/edit/Level/:name/:id', (req, res) =>{

    const  id = req.params.id;
    const name = req.params.name;

  



    res.render('edit',{name : name, id : id});
});

// ----------------------------Edit student info ---------------------------


app.post('/edit/Level/:name/:id', (req, res) => {

    const  id = req.params.id;
    const name = req.params.name;


    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var dateOfBirth = req.body.dateOfBirth;
    var gender = req.body.gender;
    var address = req.body.address;
    var city = req.body.city;
    var guardian = req.body.guardian;
    var phone = req.body.phone;
    // var className = req.body.className;
    var dateOfRegistration = req.body.dateOfRegistration;


    let k;

    


    for (let i = 0; i < list.length; i++) {

        if (list[i].name == name) {

            for (let j = 0; j < list[i].classList.length; j++) {

                if (id === list[i].classList[j].id ) {

                    k = j;

                    
                    
                }
                
            }

            list[i].classList[k].firstName = first_name;
            list[i].classList[k].lastName = last_name;
            list[i].classList[k].dateOfBirth = dateOfBirth;
            list[i].classList[k].address = address;
            list[i].classList[k].city = city;
            list[i].classList[k].gender = gender;
            list[i].classList[k].guardian = guardian;
            list[i].classList[k].phone = phone;
            list[i].classList[k].dateOfRegistration = dateOfRegistration;

            
        }
        
    }


    fs.writeFileSync('data.json', JSON.stringify(list, null, 4));
	res.redirect('/Addstudent');
});






// -------------------------login ------------------------
app.get('/', function(req, res){
    res.sendFile(__dirname + "/register.html");
});



app.post('/',function(req, res){
    var name = req.body.username;
    var mail = req.body.mail;
    var password = req.body.password;


fs.readFile('./users.json', 'utf-8', function(err, data) {
	if (err) throw err

	var arrayOfObjects = JSON.parse(data)
	arrayOfObjects.push({
		name: name,
        mail: mail,
        password : password
	});

    // console.log(arrayOfObjects);
    
    fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
        res.redirect('/AddStudent');

        
    })
})
    
})


app.get('/signIn', function(req, res){
    res.sendFile(__dirname + "/index.html");
});


app.post('/signIn',function(req, res){
    var name = req.body.username;
    var password = req.body.password;


fs.readFile('./users.json', 'utf-8', function(err, data) {
	if (err) throw err

	var arrayOfObjects = JSON.parse(data);
	

    console.log(arrayOfObjects);

    arrayOfObjects.forEach(element => {
        if (name == element.name && password == element.password ) {

         res.redirect('/AddStudent');

        }

        
    
        
    });
    
});
    
})
















app.listen(8080,function(){
    // run server on http://localhost:8080/
console.log("Server listing on port 8080...");

});
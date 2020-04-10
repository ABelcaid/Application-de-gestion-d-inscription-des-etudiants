







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





// // Add Student   //
app.post('/AddStudent',(req,res)=>{


    for(var i in list){
        if(list[i].name === req.body.className){
        list[i].classList.push({
            id : uuid.v4(),
            firstName :  req.body.firstName,
            lastName : req.body.lastName,
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
res.render('add',{list});
});


app.get('/AddStudent',function(req,res){
    // console.log(list);
    
    res.render('add',{list});
});

// Show level list --------------------


app.get('/Level/:name', function(req, res){
    var  lName =req.params.name;
    
    for (let i = 0; i < list.length; i++) {

        if (list[i].name == lName) {

            currentList = list[i].classList;


            // for (let s = 0; s < list[i].classList.length; s++) {

            //     currentList = list[i].classList[s];
                
            //     // res.render('show',{currentList});

                
                
            // }
            // // console.log('yees');
            
                
        }
     
        
        
    }

    // console.log(lName);
    res.render('show',{list,currentList});

    
});




// app.get('/edit/:id',function(req,res){
//     var  sID =req.params.id;
//     // console.log(sID);
    
    
//     for (let i = 0; i < list.length; i++) {
        
//         for (let j = 0; j < list[i].classList.length; j++) {
            
//             if (list[i].classList[j].id == sID) {
                
//                 currentList = list[i].classList[j];

                
                
//             }
            
//         }



//         // if (list[i].name == lName) {

//         //     currentList = list[i].classList;


//         //     // for (let s = 0; s < list[i].classList.length; s++) {

//         //     //     currentList = list[i].classList[s];
                
//         //     //     // res.render('show',{currentList});

                
                
//         //     // }
//         //     // // console.log('yees');
            
                
//         // }
     
        
        
//     }

//     console.log(currentList);
//     // res.render('show',{list,currentList});

//     res.render('edit',{id : sID});
// });


// app.post('/edit/:id',function(req,res){

//     var  sID =req.params.id;

    



// })














app.get('/Levelµµµµµµµ/delete/:id', (req, res) => {
    const sID = req.params.id;
    
	const tmp = [{
        "name": "firstClass",
        "classList": []
    }, {
        "name": "secondClass",
        "classList": []
    }, {
        "name": "thirdClass",
        "classList": []
    }, {
        "name": "fourthClass",
        "classList": []
    }, {
        "name": "fifthClass",
        "classList": []
    }, {
        "name": "sixthClass",
        "classList": []
    }];
	for (let i = 0; i < list.length; i++) {

    for (let j = 0; j < list[i].classList.length; j++) {

        if (sID !== list[i].classList[j].id) {

			tmp.push(list[i].classList[j]);
		}
        
    }

		
	}

	list = tmp;
    fs.writeFile('data.json',JSON.stringify(list),(err)=>{
        console.log(err);
    });
    res.render('show',{list,currentList});

	// res.redirect('/Addstudent');
});

// app.post('/edit/:id', (req, res) => {
// 	const { id } = req.params;
// 	const { title, country,local,desc,departements } = req.body;

// 	let dataId;
// 	for (let i = 0; i < data.length; i++) {
// 		if (Number(id) === data[i].ID) {
// 			dataId = i;
// 		}
// 	}

// 	data[dataId].Title = title;
// 	data[dataId].Country = country;
// 	data[dataId].local = local;
// 	data[dataId].desc = desc;
// 	data[dataId].departements= departements;

// 	fs.writeFileSync('./data/series.json', JSON.stringify(data, null, 4));

// 	res.redirect('/');
// });

// app.get('/delete/:id', (req, res) => {
// 	const { id } = req.params;
// 	console.log('req.params' + req.params);
// 	const newData = [];
// 	for (let i = 0; i < data.length; i++) {
// 		if (Number(id) !== data[i].ID) {
// 			newData.push(data[i]);
// 		}
// 	}

// 	data = newData;
// 	fs.writeFileSync('./data/series.json', JSON.stringify(data, null, 4));
// 	res.redirect('/index');
// });

// app.get('/', function(req, res){
//     res.sendFile(__dirname + "/register.html");
// });



// app.post('/',function(req, res){
//     var name = req.body.username;
//     var mail = req.body.mail;
//     var password = req.body.password;


// fs.readFile('./users.json', 'utf-8', function(err, data) {
// 	if (err) throw err

// 	var arrayOfObjects = JSON.parse(data)
// 	arrayOfObjects.push({
// 		name: name,
//         mail: mail,
//         password : password
// 	});

//     // console.log(arrayOfObjects);
    
//     fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
//         if (err) throw err
//         console.log('Done!')
//         res.sendFile(__dirname + "/test.html");

        
//     })
// })
    
// })


// app.get('/signIn', function(req, res){
//     res.sendFile(__dirname + "/index.html");
// });


// app.post('/signIn',function(req, res){
//     var name = req.body.username;
//     var password = req.body.password;


// fs.readFile('./users.json', 'utf-8', function(err, data) {
// 	if (err) throw err

// 	var arrayOfObjects = JSON.parse(data);
	

//     console.log(arrayOfObjects);

//     arrayOfObjects.forEach(element => {
//         if (name == element.name && password == element.password ) {

//          res.sendFile(__dirname + "/test.html");

//         }else
//         res.sendFile(__dirname + "/error.html");

        
    
        
//     });
    
// });
    
// })



















app.listen(8080,function(){
    // run server on http://localhost:8080/
console.log("Server listing on port 8080...");

});
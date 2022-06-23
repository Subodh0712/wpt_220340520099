
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');
const res = require('express/lib/response');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'plasework',
	port:3306
});





app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



var result;

// app.post('/poc1', function (req, res) {
	
// 		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
//     	var xyz ={ v1:37, v2:35};
//         res.send(xyz);
//     });


	app.get('/allbookdetails', (req, res) 	=> {
		let input =req.query.bookid;
		console.log(input);

	

		
		let output ={ status:false, BookDetails:{bookid:1, bookname:'physics',price:100}}
		
	connection.query(
		'select * from book where bookid=?',
		[bookid],
		(errorGot, detailsOfBook)=>
		{
			if(errorGot)
			{
				console.log( "You got the error while  fetching book deatils"+errorGot);
			}
			else{
				if(detailsOfBook.length>0){
					output.status=true;
					output.BookDetails=detailsOfBook[0];
					
				}
				else{
					console.log("Details of the book you are looking for is not found");
				}
			}
			res.send(output);
		});
		
	});




app.get('/updatebook', (req, res) {
    
		let bookdetails={
			bookid:req.query.bookid,
			bookname:req.query.bookname,
			price:req.query.price

		}

		let ouput ={
			status:false
		}

		connection.query( 'update book set bookname=?, price=?, where bookid=?',
				[bookdetails.bookid, bookdetails.bookname, bookdetails,price],
				(errorOccured, respp)=>
				{
					if(errorOccured)
					{
						console.log("Got the error"+errorOccured);
					}
					else{
						if (respp.affectedRows>0)
						{
							console.log("book has been updated successfully");
							ouput.status=true;
						}
						else {
							console.log("Book failed to update");
						}
					}
					res.send(ouput);

				});



        
		});




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});
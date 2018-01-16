var inquirer = require("inquirer");
var mysql = require("mysql");

console.log(`
                ====================================================
                                  Welcome to Bamazon!
                ====================================================             
  `)

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);


});

function afterConnection() {
  var query = connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
     console.log(`
      ID: ${res[i].id}
      PRODUCT: ${res[i].product_name}
      DEPARTMENT: ${res[i].department_name}
      PRICE: $${res[i].price}
      QUANTITY: ${res[i].stock_quantity}`); 
    }
    // connection.end();
      inquirer.prompt([

      {
        type: "input",
        name: "product",
        message: "What is the product ID of the product you would like to purchase from the above list?"
      },

      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?"
      }

    ]).then(function(answer) {


      if(res[answer.product - 1].stock_quantity < answer.quantity){
         console.log(`Sorry! There is an insufficient quantity for this order`)
         inquirer.prompt([
         {
          type: "confirm",
          name: "again",
          message: "Would you like try a different order?"
         }
          ]).then(function(answer){
            if(answer.again){
              afterConnection();
            }
            else{
              connection.end();
              return console.log(`
                ====================================================
                Thanks for shopping with Bamazon! See you next time!
                ====================================================
                `);
            }
          });

      }

      else{

        console.log(`
          You've order ${answer.quantity} units of ${res[answer.product - 1].product_name}
          Your total is $${(res[answer.product - 1].price * answer.quantity)}`);
        
        var updatedQuantity = res[answer.product - 1].stock_quantity - answer.quantity;
        // console.log(`NEW QUANTITY: ${updatedQuantity}`);

        var updateQuery = `UPDATE products SET stock_quantity= ${updatedQuantity} WHERE id=${answer.product}`;
        

        connection.query(updateQuery, function(err, results){
          console.log(`
                ====================================================
                Thanks for shopping with Bamazon! See you next time!
                ====================================================
                `);
        });
        // console.log(`UPDATED QUANTITY: `)
        connection.end();
      }
      

    });
  });


}


afterConnection();




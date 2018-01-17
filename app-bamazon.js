var Table = require('cli-table2');
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


  user: "root",


  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;


});

function afterConnection() {
  var query = connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    var cliTable = new Table({
      head: ['ID', 'PRODUCT', 'DEPARTMENT', 'PRICE', 'QUANTITY']
      });

    for (var i = 0; i < res.length; i++) {
      cliTable.push(
            [res[i].id, res[i].product_name, res[i].department_name, '$' + res[i].price, res[i].stock_quantity]
        );
    }
    console.log(cliTable.toString());
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

        
        
        var updatedQuantity = res[answer.product - 1].stock_quantity - answer.quantity;

        var updateQuery = `UPDATE products SET stock_quantity= ${updatedQuantity} WHERE id=${answer.product}`;
        

        connection.query(updateQuery, function(err, results){
          console.log(`
          You've order ${answer.quantity} units of ${res[answer.product - 1].product_name}
          Your total is $${(res[answer.product - 1].price * answer.quantity)}
          `);
          inquirer.prompt([
         {
          type: "confirm",
          name: "again",
          message: "Would you like to create another order?"
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
        });

      }
      

    });
  });


}


afterConnection();




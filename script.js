class Product {
    //Product class with its attributes and properties.
    constructor(id, productName, category, stock, price, available) {
        this.id = id
        this.productName = productName
        this.category = category
        this.stock = stock
        this.price = price
        this.available = available
    }

    //This method calculates the tax for the product, here in USA it is 7% of the original value.
    priceTaxes() {
        return this.price * 0.07
    }

    //This method decreases the stock by 1 when a product is added to the cart. If the stock reaches 0 it won't let you add it to the cart.
    sell() {
        this.stock--

        if (this.stock == 0) {
            this.available = false
        }
    }

    //This method increases the stock by 1 when the product is returned, this is applied when you clear the cart.
    return() {
        this.stock++

        if (this.stock > 0) {
            this.available = true
        }
    }
}



const greenShoes = new Product(1, "Green Shoes", "Footwear", 3, 30, true)
const greenShirt = new Product(2, "Green Shirt", "Upper Body", 2, 10, true)
const redShoes = new Product(3, "Red Shoes", "Footwear", 5, 15, true)
const redShirt = new Product(4, "Red Shirt", "Upper Body", 4, 5, true)
const blueShoes = new Product(5, "Blue Shoes", "Footwear", 2, 50, true)
const blueShirt = new Product(6, "Blue Shirt", "Upper Body", 1, 15, true)
const blueJeans = new Product(7, "Blue Jeans", "Lower Body", 4, 25, true)
const shorts = new Product(8, "Shorts", "Lower Body", 2, 20, true)
const blackJeans = new Product(9, "Black Jeans", "Lower Body", 3, 30, true)

let productList = [greenShoes, greenShirt, redShoes, redShirt, blueShoes, blueShirt, blueJeans, shorts, blackJeans]
let productIndex = -1
let shoppingCartIndex = -1
let choice = 0
let itemSelector = ''
let filterSelector = 0
let shoppingCart = []
let shoppingOn = true
let grandTotal = 0
let itemListHeader = ''


do {

    //Here basically it ask you what you want to do, you can either see the list of products to buy, check your shopping cart or exit the program.
    choice = parseInt(prompt("How can I help you today? \n 1. List of available products.\n 2. Your shopping cart. \n 3. Exit. \n\n Please write the number of your choice."))
    while (isNaN(choice) || choice == 0 || choice > 3) {
        choice = parseInt(prompt("That was not a valid option! Please enter the number of your choice. \n\nHow can I help you today? \n 1. List of available products.\n 2. Your shopping cart. \n 3. Exit. \n\n Please write the number of your choice."))
    }

    switch (choice) {

        //LIST OF PRODUCTS
        case 1:
            itemListHeader = "ID | Name | Category | Stock | Price"
            productListSorted = productList //This "mirrors" the product list so when sorted and filtered the original list is not affected. I named it "Sorted" because later in the code I use it to sort the items.
            do {
                //The code "Renders" the list of products so they are displayed properly in the alert() window.
                for (var product of productListSorted) {
                    itemListHeader += `\n${product.id}` + ` | ${product.productName}` + ` | ${product.category}` + ` | ${product.stock} units` + ` | $${product.price}`
                }

                //The way you select the items is entering the number of the ID that is located in the first column
                itemSelector = prompt(itemListHeader + "\n\nEnter the ID number of the item you wanna add to your shopping cart!, type 'filter' to see filtering option or 'leave' to go back to the previous menu.")

                //Next line checks if the ID you entered exists in the sorted productList so you can not add products that are not shown at the time.
                if (productListSorted.find(product => product.id == parseInt(itemSelector))) {
                    //Cool the item exists, now lets find its index so we can push it to the shopping cart.
                    productIndex = productList.findIndex(product => product.id == parseInt(itemSelector))
                    //First it checks if there are units in stock.
                    if (productList[productIndex].available) {
                        //Before pushing it to the cart it checks if the product is already added, if so it only adds 1 to the quantity instead of pushing in it again.
                        if (shoppingCart.find(product => product.id == productList[productIndex].id)) {
                            shoppingCartIndex = shoppingCart.findIndex(product => product.id == productList[productIndex].id)
                            shoppingCart[shoppingCartIndex].quantity++
                        }
                        //If it is not in the cart it will push a new object with only the more important attributes.
                        else {
                            shoppingCart.push({ id: productList[productIndex].id, productName: productList[productIndex].productName, quantity: 1, price: productList[productIndex].price, taxable: productList[productIndex].priceTaxes() })
                        }

                        productList[productIndex].sell() //decrease 1 unit from stock.
                    }

                    else {
                        alert("There is no more stock for that item!") //This will happen if you try to add an item that is out of stock.
                    }

                }
                
                //This block of code is to filter and sort the item list.
                else if (itemSelector.toLowerCase() == "filter") {
                    productListSorted = productList
                    filterSelector = parseInt(prompt("Filtering options!:\n\n 1.Min price to Max price.\n 2.Max price to Min price.\n 3.Sort by ID(Default).\n 4.Sort by category.\n 5.Show only footwear.\n 6.Show only upper body.\n 7.Show only lower body.\n\nEnter the number of the filter you wanna apply."))

                    switch (filterSelector) {
                        case 1: //Min to Max
                            productListSorted.sort(function (a, b) {
                                return a.price - b.price
                            })
                            break

                        case 2: //Max to Min
                            productListSorted.sort(function (a, b) {
                                return b.price - a.price
                            })
                            break

                        case 3://By id
                            productListSorted.sort(function (a, b) {
                                return a.id - b.id
                            })
                            break

                        case 4://By category in alphabetic order
                            productListSorted.sort(function (a, b) {
                                if (a.category < b.category) {
                                    return -1
                                }
                                if (a.category > b.category) {
                                    return 1
                                }
                                return 0
                            })
                            break

                        case 5://Shows only footwear category
                            productListSorted = productList.filter(function(product){
                                return product.category === "Footwear"
                            })
                            break

                        case 6://Shows only Uppder body category
                            productListSorted = productList.filter(function(product){
                                return product.category === "Upper Body"
                            })
                            break
                        
                        case 7:// Shows only lower body category
                            productListSorted = productList.filter(function(product){
                                return product.category === "Lower Body"
                            })
                            break
                    }


                }

                else if (itemSelector.toLowerCase() == "leave") {//Sents you back to the main menu.
                    break
                }

                else {
                    alert("There is no item with that ID or you misspelled 'leave'. Please try again.") 
                }
                itemListHeader = "ID | Name | Category | Stock | Price" //Resets the item list so it does not write it more than once.
            }

            while (itemSelector.toLowerCase() != "leave")



            break
        
        //SHOPPING CART
        case 2:
            //"Renders" the shopping cart array in the Alert() window.
            itemListHeader = "ID |   Name   |   Quantity   |   Price   |   Taxable   |   Total"
            grandTotal = 0
            for (var product of shoppingCart) {
                itemListHeader += `\n${product.id}` + ` | ${product.productName}` + ` | ${product.quantity} units` + ` | $${product.price}/unit` + ` | $${product.taxable.toFixed(2)}/unit` + ` | $${((product.price + product.taxable) * product.quantity).toFixed(2)}`

                grandTotal += Number(((product.price + product.taxable) * product.quantity))
            }

            do {

                //Show the shopping cart list and ask you what you want to do.
                itemSelector = parseInt(prompt("This is your shopping cart!\n\n" + itemListHeader + `\n\nTotal price: $${grandTotal.toFixed(2)}` + "\n\n1.Reset shopping cart.\n2.Back to main menu to keep shopping\n3.Place order!"))

                if (itemSelector == 1) { //Clears the shopping cart.
                    alert("Your shopping cart has been cleared.")

                    for (var item of shoppingCart) {                                                        //This block of code goes item by item
                        for (let i = 0; i < item.quantity; i++) {                                           //and restores the stock of the original
                            productList[productList.findIndex(product => product.id == item.id)].return()   //product list so when you clear the cart
                        }                                                                                   //there is no missing stock.
                    }
                    shoppingCart = []
                    break
                }
                else if (itemSelector == 2) { //Sends you back to the main menu.
                    alert("Going back to main menu.")
                }
                else if (itemSelector == 3) { //Simulates the order being complete, shows you the resume of the transaction and exits the program.
                    alert(`Thanks for your purchase! Come back soon!\n\nResume of your order:\n\n` + itemListHeader + `\n\nTotal price: $${grandTotal.toFixed(2)}`)
                    shoppingOn = false
                    break
                }
                else {
                    alert("That is not a valid option")
                }
            }
            while (itemSelector != 2)


            break

        case 3://You were just looking and did not buy anything.
            alert("Have a good day! Come back soon!")
            shoppingOn = false
            break
    }
}
while (shoppingOn)





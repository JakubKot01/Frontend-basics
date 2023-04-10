
/**
 * @typedef {Object} product
 * @property {number} id Unique product id
 * @property {string} name product name
 * @property {number} number number of products
 * @property {Date} date product date
 * @property {string} status information if product is bought or not
 * @property {number} price price
 */
let list_of_products = [
    {
        id: 1, 
        name: "one", 
        number: 1, 
        date: new Date("2010-10-10"),
        status: "bought",
        price: 1
    }, 
    {
        id: 2, 
        name: "Two", 
        number: 2, 
        date: new Date("2022-11-21"),
        status: "bought",
        price: 0
    }
];

/**
 * Function adds product to an list_of_products array with product list
 * @param {string} name product name
 * @param {number} number number of products
 * @param {Date} date product date
 * @param {string} status product status
 * @param {number} price product price
 * @returns Random product id
 */
function add_product(name, number, date, status, price = 0) {
    let new_id = Math.floor(1000000 * Math.random());
    if (status === "not bought") {
        price = 0;
    }
    if (number == 0) {
        console.error("Number of products cannot be 0!");
    } else {
    list_of_products.push(
        {
            id: new_id, 
            name: name, 
            number:number, 
            date: new Date(date),
            status: status,
            price: price
        });
        return new_id;
    }
};

add_product("Three", 2, "2022-11-21", "bought", 2);
add_product("Four", 3, "2022-11-17", "not bought");

/**
 * Function deletes product with specific id
 * @param {number} id product id
 */
function delete_product(id) {
    let index = list_of_products.findIndex(obj => obj.id == id);
    list_of_products.splice(index, 1);
};

/**
 * Function edits product with specific id by setting an arg property to the val value
 * @param {number} id product id 
 * @param {string} arg product property that will be changed
 * @param {any} val new value of given product property
 */
function edit_product(id, arg, val) {
    let index = list_of_products.findIndex(obj => obj.id == id);
    if (arg === "number" && val === 0) {
        console.error("Number cannot be 0!")
    }
    else {
        list_of_products[index][arg] = val;
    }
    if (list_of_products[index].status === "not bought") {
        list_of_products[index].price = 0;
    }
};

/**
 * Function changes position of a product with specific id
 * @param {number} id product id 
 * @param {number} pos new position of a product
 */
function swap(id, pos) {
    let index = list_of_products.findIndex(obj => obj.id === id);
    const aux = list_of_products[index];
    delete_product(id);
    list_of_products.splice(pos, 0, aux);
};

/**
 * Function checks if the date given as an arguments is equal to the today's date
 * @param {Date} x product date
 * @returns true or false
 */
function is_today(x) {
    return (
        x.date.getDay() === new Date().getDay() &&
        x.date.getMonth() === new Date().getMonth() &&
        x.date.getFullYear() === new Date().getFullYear()
    );
};

/**
 * Function filters the list of product
 * @returns list of products with today's date in date parameter
 */
function sbbt() {
    return list_of_products.filter(is_today);
};

/**
 * Function sets product's with specific id price to the price value
 * @param {number} id product id 
 * @param {number} price new product price
 */
function change_price(id, price) {
    let index = list_of_products.findIndex(obj => obj.id === id);
    if (list_of_products[index].price === 0) {
        list_of_products[index].price = price;
    }
};

/**
 * Function returns summary value of the prices of all product with the specific date
 * @param {Date} date date to compare with products date
 * @returns 
 */
function get_price(date) {
    let res = 0;
    let x = new Date(date);
    for (const product of list_of_products) {
        if (product.date.getDay() === x.getDay() &&
            product.date.getMonth() === x.getMonth() &&
            product.date.getFullYear() === x.getFullYear()) {
            res += product.price * product.number;
        }
    }
    return res;
};

/**
 * Function that applies function on a product with specific ids with max 3 arguments
 * @param {number[]} ids list of ids
 * @param {FunctionCallback} foo function to call on a products
 * @param {any} arg1 first argument
 * @param {any} arg2 second argument
 * @param {any} arg3 third argument
 */
function apply(ids, foo, arg1, arg2, arg3) {
    for (id of ids) {
        let index = list_of_products.findIndex(obj => obj.id === id);
        foo(list_of_products[index], arg1, arg2, arg3);
    }
    /**
    * @callback {FunctionCallback} 
    * @param {product} product filtered product from product list
    * @param {any} arg1 first argument
    * @param {any} arg2 second argument
    * @param {any} arg3 third argumnet
    */
};

/**
 * Function counting value in EUR by taking a PLN value and the course
 * @param {product} product product from product list
 * @param {number} course course to count an EUR value
 */
function pln_to_eur(product, course) {
    let prev = product.price;
    product.price = course * prev;
};

/**
 * Function adding two values to a product.price value
 * @param {product} product product from product list
 * @param {number} val1 first value
 * @param {number} val2 second value
 */
function test(product, val1, val2) {
    product.price += val1 + val2;
}

//delete_product(1);

//console.log(list_of_products);

//edit_product(1, "name", "Nadal zero");

//swap(1, 2);

//console.log(list_of_products);

//change_price(1, 5);

change_price(2, 5);

console.log(list_of_products);

console.log(sbbt());

console.log(get_price("2022-11-21"));

//apply([1, 2], pln_to_eur, 0.25);

apply([1, 2], test, 2, 3);

console.log(list_of_products);
const path = require('path');
const fs = require('fs');

//Cargar desde el archivo JSON
let JSONPath = (name) => path.join(__dirname, '../data/' + name);
let resultReadJSON = (JSONPath) => JSON.parse(fs.readFileSync(JSONPath, 'utf-8'));

//Obtener objeto
let products = resultReadJSON(JSONPath('products.json'));
let paymentMethod = resultReadJSON(JSONPath('paymentMethod.json'));
let categoryProduct = resultReadJSON(JSONPath('categoryProduct.json'));


const productsController = {
    create: (req, res) => {
        res.render('products/createProduct', { paymentMethod, categoryProduct });
    },

    //Acción de creación post
    store: function(req, res) {

        let body = req.body;

        let newProduct = {
            id: Date.now(),
            name: body.name,
            specifications: body.specifications,
            characteristics: [{
                title: body.characteristicsTitle,
                main: [{
                    subtitle: body.characteristicsContextSubtitle,
                    description: body.characteristicsContextDescription
                }]
            }],
            category: body.category,
            warrantyText: body.warrantyText,
            warrantyTime: body.warrantyTime,
            paymentMethod: body.paymentMethod,
            price: body.price,
            descount: body.descount,
            images: ["prueba.png"],
            cuotas: "30x $30.400",
            color: ["Color"],
            envio: 4,
            valorDevolucion: 0
        }

        products.push(newProduct);

        let ProductsJSON = JSON.stringify(products);

        fs.writeFileSync(JSONPath('products.json'), ProductsJSON);
        res.redirect('/products');

    },
    list: (req, res) => {

        res.render('products/listProducts', { products });

    },
    cart: (req, res) => {

        res.render("products/cartProduct")

    },
    detail: (req, res) => {

        let id = req.params.id;
        let product = products.find(product => product.id == id);

        res.render('products/detailProduct', { product, paymentMethod });
    },
}




module.exports = productsController;
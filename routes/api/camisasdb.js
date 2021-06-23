const express = require("express");
let router = express.Router();

let productModel = require('../../models/productos.model')();

const ProductModelClass = require('../../models/productos/productos.model');
const mdbProductModel = new ProductModelClass();

router.get('/all', async(req, res)=>{
    try{
        const rslt = await mdbProductModel.getAll()
        res.status(200).json(rslt);
    }catch(ex){
        console.log(ex);
        res.status(500).json({"msg":"FALLA EN LA MATRIX."});
    }
});

router.post('/new', async (req, res)=>{
    try{
        let { sku, name, price, stock=0} = req.body;
        price = Number(price);
        stock = Number(stock);
        var rslt = await mdbProductModel.addOne({ sku, name, price, stock});
        res.status(200).json(rslt);
    }catch(ex){
        console.log(ex);
        res.status(500).json({ "msg": "FALLA EN LA MATRIX." });
    }
});

router.put('/upd/:id', async (req, res)=>{
  try{
    let {id} = req.params;
    //id = Number(id);
    let {stock, sales} = req.body;
    sales = Number(sales);
    stock = Number(stock);
    let rslt = await mdbProductModel.updateById(id, stock, sales);
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "FALLA EN LA MATRIX." });
  }
});

router.delete('/del/:id',async (req, res)=>{
  let {id} = req.params;
  try{
    let rslt = await mdbProductModel.removeById(id);
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "FALLA EN LA MATRIX." });
  }
});

router.get('/one/:id', async (req, res)=>{
  try{
    let { id } = req.params;
    let oneDocument = await mdbProductModel.getById(id);
    res.status(200).json(oneDocument);
  } catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.get('/top', (req, res)=>{
    productModel.getTopTen( (err, productos)=>{
        if (err) {
            console.log(err);
            return res.status(503).json({ "error": "FALLA EN LA AMTRIX." });
        }
        return res.status(200).json(productos);
    }
  );

});


router.put('/sales/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let { stock, sales } = req.body;
        sales = Number(sales);
        stock = Number(stock);
        let rslt = await mdbProductModel.updateSales(id, stock, sales);
        res.status(200).json(rslt);
    }catch (ex) {
        console.log(ex);
        res.status(500).json({ "msg": "FALLA EN LA MATRIX." });
    }
});

module.exports = router;
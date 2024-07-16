const express= require('express');
const router= express.Router();

const MenuItem= require('../models/MenuItem');



router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const Menu = new MenuItem(data);
  
      const response = await Menu.save();
      console.log("data sved");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Interal Server Error" });
    }
  });







module.exports= router;


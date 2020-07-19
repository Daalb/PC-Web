const Menu = require("../models/menu");
const { create } = require("../models/menu");

function addMenu(req,res){
    const { title, url, order, active } = req.body;
    const menu = new Menu();

    menu.title = title;
    menu.url = url;
    menu.order = order;
    menu.active = active;

    menu.save((err, createdMenu) => {
        if (err) {
            res.status(500).send({message: "Error del servidor "});
        } else {
            if (!createdMenu) {
                res.status(404).send({message: "Error al crear el menú. "});
            } else {
                res.status(200).send({message: "Menú creado correctamente. "});
            };
        };

    });
}

module.exports = {
    addMenu
}
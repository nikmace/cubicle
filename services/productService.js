const Cube = require('../models/Cube');

async function getAll(query) {
    let products = await Cube.find({}).lean();

    if (query.search) {
        products = products.filter(x => x.name.toLowerCase().includes(query.search));
    }

    if (query.from) {
        products = products.filter(x => Number(x.level) >= query.from)
    }

    if (query.to) {
        products = products.filter(x => Number(x.level) <= query.to)
    }

    return products;
}

async function getOne(id) {
    let cube = await Cube.findById(id).lean();
    return cube;
}

function create(data) {
    let cube = new Cube(data);
    
    return cube.save();
}


module.exports = {
    create,
    getAll,
    getOne,
}
const homes = require('./db.json')

let houseId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(homes)
    },
    deleteHouse: (req, res) => {
        let index = homes.findIndex(elem => elem.id === +req.params.id)
        homes.splice(index, 1)
        res.status(200).send(homes)
    },
    createHouse: (req, res) => {
        let {address, price, imageURL} = req.body
        let newHouse = {
            id: houseId,
            address,
            price: +price,
            imageURL
        }
        homes.push(newHouse)
        res.status(200).send(homes)
        houseId++
    },
    updateHouse: (req, res) => {
        let {id} = req.params
        let {type} = req.body

        let index = homes.findIndex(elem => elem.id === +id)

        if(homes[index].price <= 10000 && type === 'minus'){
            res.status(400).send('We are not paying you to live here')
        } else if (type === 'plus'){
            homes[index].price += 10000
            res.status(200).send(homes)
        } else if (type === 'minus'){
            homes[index].price -= 10000
            res.status(200).send(homes)
        } else {
            res.status(400).send('Not working')
        }
    }
}
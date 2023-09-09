const ShortLink = require('../models/shortLink');

const redirctUrl = async (req, res) => {
    try{
        const shortUrl = req.params.string;
        const result = await ShortLink.find()
            result.forEach(element => {
                if (shortUrl === element.ShortURL) {
                    res.redirect(element.url);
                }
            });
    }
    catch (err) {
        console.log(err.message);
    }
}

const createShortLink = async (req, res) => {
    try {
        const userID = req.params.userId;
        const {url} = req.body;
        const shortL = new ShortLink({url, userID});
        const result = await shortL.save();
        
        res.send({result});
    }
    catch (err) {
        console.log(err.message);
    }
}

const getAllLinks = async (req, res) => {
    try {
        let arr = [];
        const userId = req.params.userId;
        const result = await ShortLink.find();
        result.forEach(element => {
            if (element.userID === userId) {
                arr.push(element);
            }
        });
        res.send(arr);
    } catch (error) {
        console.log(err.message)
    }
}

const deleteShortLink = async (req, res) => {
    try {
        const userId = req.params.userId;
        const shortL = req.params.shortUrl;
        const result = await ShortLink.find();

        result.forEach(element => {
            if (element.userID === userId && element.ShortURL === shortL) {
                ShortLink.findByIdAndDelete(element.id)
                    .then(deleteShortLink => {
                        res.send(element);
                    });
            }
        });
    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    createShortLink,
    getAllLinks,
    deleteShortLink,
    redirctUrl
}
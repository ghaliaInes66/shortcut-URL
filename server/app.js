const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routers/userRouter');
const shortLinkRoute = require('./routers/ShortLinkRoute');
const { redirctUrl } = require('./controllers/shortLink');
const Cors = require('cors');

// connect to mongodb
const dbURI = "mongodb+srv://SidAhmed:123@cluster0.claucrs.mongodb.net/Short_Link?retryWrites=true&w=majority"

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {
        app.listen(2000, () => {
            console.log("server is Runnig in 2000");
        });
    })
    .catch(err => console.log(err.message));

app.use(Cors());

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', userRoute, shortLinkRoute);

app.get('/ch.bit/:string', redirctUrl);
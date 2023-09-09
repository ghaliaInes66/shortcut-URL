const { hashSync, compare } = require('bcrypt');
const User = require('./models/user');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const saltNumber = 10;

// connect to mongodb
const dbURI = "mongodb+srv://SidAhmed:213698@cluster0.claucrs.mongodb.net/Short_Link?retryWrites=true&w=majority"

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => console.log('db is connected'))
    .catch(err => console.log(err));

app.use(express.json());

app.post('/api/v1/users', (req, res) => {
    const body = req.body;
    const user = new User({
        userName: body.userName,
        email: body.email,
        password: hashSync(body.password, saltNumber)
    });

    user.save()
        .then(result => {
            res.send({
                success: true,
                "user": {
                    "id": result.id,
                    "userName": result.userName
                }
            });
        })
        .catch(err => console.log(err));

});

app.get("/api/v1/users", (req, res) => {
    const body = req.body;

    User.find()
        .then(users => {
            users.forEach(element => {
                if (element.userName === body.userName) {
                    compare(body.password, element.password, (err, result) => {
                        if (err) {
                          console.error('Error comparing passwords:', err);
                        } else if (result) {
                          console.log('Password is correct');
                          res.send(element);
                          // Allow access to the user
                        } else {
                          console.log('Password is incorrect');
                          // Deny access to the user
                        }
                    });
                }
            });
        })
        .catch(err => console.log(err));

});

app.put('/api/v1/users/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const new_user = {
        userName: body.userName,
        email: body.email,  
        password: hashSync(body.password, saltNumber)
    }

    User.findByIdAndUpdate(id, new_user,{new: true})
    .then((updatedUser) => {
        if (!updatedUser) {
          console.log('User not found.');
        } else {
          console.log('Updated user:', updatedUser);
          res.send({
                success: true,
                message: `The data of User with ID ${id}, has been updated`,
            });
        }
      })
      .catch((err) => {
        console.error('Error updating user:', err);
      });
});


app.delete('/api/v1/users/:id', (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(deleteUser => {
            if (!deleteUser) {
                console.log("User Not Found!");
            } else {
                res.send({
                    success: true,
                    message: `user with ID ${id} has been deleted`
                });
            }
        })
        .catch(err => console.log(err));
});

app.listen(2000, () => {
    console.log("server is Runnig in 2000")
})
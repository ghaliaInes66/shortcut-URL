const { hashSync, compare, compareSync } = require('bcrypt');
const User = require('../models/user');
const saltRounds = 2;

const SignUpUSer = (req, res) => {
    const body = req.body;
    const user = new User({
        userName: body.userName,
        email: body.email,
        password: hashSync(body.password, saltRounds)
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
}

const logInUser = (req, res) => {
    const userName = req.params.userName;
    const pass = req.params.pass;

    User.find()
        .then(users => {
            users.forEach(element => {
                if (element.userName === userName) {
                    compare(pass, element.password, (err, result) => {
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
}

const findUserInfo = async (req, res) => {
    const id= req.params.id;

    const userInfo = await User.findById(id);
    console.log(userInfo);
    res.send(userInfo);
}


const updateUser = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const new_user = {
        userName: body.userName,
        email: body.email,  
        password: hashSync(body.password, saltRounds)
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
}

const deleteUser = (req, res) => {
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
}

const checkPassword = async (req, res) => {
    const id = req.params.id;
    const pass = req.params.password;
    const user = await User.findById(id);
    const result = compareSync(pass, user.password);
    if (result) {
        res.send(user);
    }
}

module.exports = {
    SignUpUSer,
    logInUser,
    findUserInfo,
    updateUser,
    deleteUser,
    checkPassword
}
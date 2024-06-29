
const Users = require('../model/user')
//get all users
const users_all = async (req, res) => {
    try {
        // Find the user by username
        const user = await Users.findOne({ p_name: req.body.p_name });
        
        // If user is not found, send "not found" message
        if (!user) {
            return res.status(404).send("User not found");
        }
        
        // Compare the password
        if (user.p_pwd === req.body.p_pwd) {
            // Return user details (excluding the password for security reasons)
            const userData = {
                p_id: user.p_id,
                p_name: user.p_name
            };
            res.status(200).json(userData);
        } else {
            // If password does not match
            res.status(401).send("Incorrect password");
        }
    } catch (error) {
        // Catch any errors and send an error message
        console.error(error);
        res.status(500).send("Server error");
    }
}
//insert a product
const insert_user = async (req, res) => {
    const user = new Users({
        p_id: req.body.p_id,
        p_name: req.body.p_name,
       p_pwd:req.body.p_pwd
    })
    try {
        const savedUser = await user.save()
        console.log('user inserted')
        res.send(savedUser)
    }
    catch (error) {
        res.status(400).send(error)
    }
}



module.exports = {
    users_all,
    insert_user
   
}

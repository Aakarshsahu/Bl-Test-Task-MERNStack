const userModel = require("../model/userSchema");


exports.homepage = (req, res, next) => {
    res.status(200).json({ message: "It's the homepage" });
}

exports.register = async(req, res) => {
    try {
        const { name, email, phone, password } = req.body;
    
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email is already registered' });
        }
    
        const newUser = new userModel({
          name,
          email,
          phone,
          password, 
        });
    
        
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}




exports.userlogin = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }
    
        const user = await userModel.findOne({ email, password });
    
        if (user) {
          return res.status(200).json({ message: 'Login successful' });
        } else {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
      } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

exports.getAllUsers = async (req,res)=>{
    try {
        const users = await userModel.find();

        res.status(200).json({ users });
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
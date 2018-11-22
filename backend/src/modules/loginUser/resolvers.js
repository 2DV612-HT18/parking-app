import {getConnection} from "typeorm";
import User from "../../models/User";
const bcrypt = require("bcrypt");


export const resolvers = {
  Mutation: {
    loginUser: async (_, args) => {
      let connection = getConnection()  
      let userRepository = connection.getRepository(User)

      // Query the database to check if user exists with email specified.
      let data = await userRepository.find({ where: {email: args.email }})
      
      // If user with specified email doesn't exist, save the user to the database.
      if (data.length === 1) {
        let user = new User(data[0].id, data[0].role, data[0].firstName, data[0].lastName, data[0].email, data[0].personalNumber, data[0].password)
        bcrypt.compare(args.password, user.password, (err, res) => {
          console.log(res)
          if (res) { 
            // return {token, user}
          } else {
            // Return nothing? / Throw error
          }          
        });          
      }
      else {       
        // No user found with that email
      }      
    },
  },
};

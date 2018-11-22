import {getConnection} from "typeorm";
import User from "../../models/User";
const bcrypt = require("bcrypt");


export const resolvers = {
  Mutation: {
    loginUser: async (_, args) => {
      let connection = getConnection()  
      let userRepository = connection.getRepository(User)

      // Query the database to check if user exists.
      let data = await userRepository.find({ where: {email: args.email }})
      
      // If user exists
      if (data.length === 1) {
        let user = new User(data[0].role, data[0].firstName, data[0].lastName, data[0].email, data[0].personalNumber, data[0].password)
        
        // Promise to get the result from the bcrypt.compare
        const result = await new Promise((resolve, reject) => {
          bcrypt.compare(args.password, user.password, (err, res) => {
            if (err)
            reject(err)
            resolve(res)
          });
        })
        console.log(result)
        if (result) { 
          // return {token, user}
        } else {
          // Return nothing? / Throw error
        }           
      }
      else {       
        // No user found
      }      
    },
  },
};

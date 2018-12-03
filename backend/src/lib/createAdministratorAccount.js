import User from '../models/User';
const bcrypt = require("bcrypt");

export default async () => {
    const hashedPassword = await bcrypt.hash('admin', 6)
    const admin = await new User(0, "Admin", "Account", process.env.NODEMAILER_USER, 0, hashedPassword, true);

    return admin
}

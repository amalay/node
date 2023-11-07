var bcrypt = require("bcryptjs");

module.exports = function(data) {
    this.UserName = data.UserName;
    this.Password = bcrypt.hashSync(data.Password, 8);
    this.FirstName = data.FirstName;
    this.LastName = data.LastName;
    this.Email = data.Email;
    this.RoleId = 2;
};
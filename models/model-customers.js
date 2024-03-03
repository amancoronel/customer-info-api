module.exports = (mongoose, connection) => {
    const CustomerSchema = new mongoose.Schema({
        first_name :    {type: String},
        middle_name :   {type: String},
        last_name:      {type: String},
        email:          {type: String, unique: true},
        location:        {type: String},
        password:       {type: String}
    })

    return connection.model("customers", CustomerSchema);
}
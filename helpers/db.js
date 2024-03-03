const Models = require('../models')

exports.addData = async (data, model) => {
    try {
        const newData = new Models[model](data)
        await newData.save()
        return { result : true, data }
    } catch(e) {
        return { result: false, error: e}
    }
}

exports.getData = async (condition, model) => {
    try {
        const data = await Models[model].findOne({ ...condition })
        if(data) {
            return { result : true, data }
        } else {
            return { result : false }
        }
    } catch(e) {
        return { result: false, error: e}
    }
}

exports.updateData = async (condition = {}, data, model) => {
    try {
        await Models[model].findOneAndUpdate(condition, { $set: data })
        return { result : true, data }
    } catch(e) {
        return { result: false, error: e}
    }

}

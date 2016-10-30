var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    name: {type: String, required: true, unique: true},
    role: {type: String, required: true},
    password: {type: String, required: true},
    token: { type: String },
    email: {type: String, required: true, unique: true},
    description: {type: String},
    avatar: { type: String },
    attributes:
    {
        height: {type: String},
        weight: {type: String},
        gender: {type: String},
        age: {type: String}
    },
    publications:
        [{
        title: {type: String},
        date: {type: Date},
        content: {type: String}
    }],
    diets: [{
        title: {type: String},
        description: {type: String},
        days:
            [{
            title: {type: String},
            meals: [{
                title: {type: String},
                submeal: [{
                    title: {type: String},
                    description: {type: String},
                    amount: {
                        unit: {type: String},
                        quantity: {type: String}
                    },
                    nutritional: {
                        kcal: {type: String},
                        proteins: {type: String},
                        carbohidrates: {type: String},
                        fats: {type: String},
                        vitamins: {type: String}
                    }
                }]
            }]
        }]
    }]  ,
    coaching: [{
        coachid: {type: String},
        routines: [{
            title: {type: String},
            description: {type: String},
            days: [{
                title: {type: String},
                exercises: [{
                    name: {type: String},
                    description: {type: String},
                    img: {type: String},
                    weight: {type: String},
                    distance: {type: String},
                    reps: {type: String},
                    series: {type: String}
                }]
            }]
        }]
    }]
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);

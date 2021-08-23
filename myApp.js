require('dotenv').config();
const mongoose = require('mongoose');

const personSchema = require('./person.schema');

mongoose.connect(process.env['MONGO_URI'], {useNewUrlParser: true,useUnifiedTopology: true });



const Person = mongoose.model('Person', personSchema) ;



const createAndSavePerson = (done) => {
  let pape = new Person({
    name:'Pape',
    age: 24,
    favoriteFoods:['pizza', 'steak', 'habba']
    });
    pape.save((err,data)=>
     err ? console.log(err) : done(null,data))
};


const createManyPeople = (arrayOfPeople, done) => {
  arrayOfPeople.forEach(person=>{
    let user = new Person({name:person.name, age:person.age, favoriteFoods: person.favoriteFoods})
    user.save((err,data)=> err ? console.log(err) : done(null,data))
  });
};

const findPeopleByName = (personName, done) => {
 return Person.find({"name":""+personName},(err,data)=> 
  err ? console.log(err): done(null, data))
};

const findOneByFood = (food, done) => {
  return Person.findOne({"favoriteFoods":""+food}, (err,data)=>
  err ? console.log(err) : done(null,data))
};

const findPersonById = (personId, done) => {
  return Person.findById(personId,(err,data)=> 
  err ? console.log(err) : done(null,data))
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err,data)=> {
    if(err) return console.log(err)
    data.favoriteFoods.push(foodToAdd);
    data.save((err,data)=> err ? console.log(err): done(null,data));
  }
   );
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(personName,{new:true},(err,person)=>{
    if(err) return consoke.log(err)
    person.age=ageToSet;
    person.save((err,data)=> err? console.log(err): done(null,data))
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,(err,person)=> err ? console.log(err): done(err, person))
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({"name":nameToRemove},(err,data)=>err? console.log(err): done(null, data) )
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const tofind= Person.find({"favoriteFoods":foodToSearch});
  tofind.sort({name:1}).limit(2).select({ name:2})
  .exec((err,data)=> err? console.log(err): done(null,data))
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

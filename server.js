const mongoose = require("mongoose");

// connecting to mongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Create a person with this prototype:

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  age: Number,
  FavoriteFoods: [String],
});

const Person = mongoose.model("Person", PersonSchema);

const createAndSavePerson = function (newPerson) {
  const jhon = new Person({
    name: "ali",
    age: 20,
    favoriteFoods: ["Apple", "Orange"],
  });

  jhon.save((err, newPerson) => {
    if (err) return newPerson(err);
    return newPerson(null, data);
  });
};




//Create Many Records with model.create()


const users = [
  { name: "ali",email: "ali@gmail.com" , age: 18, favoriteFoods: ["Makloub"] },
  { name: "mouna", email: "mouna@live.fr", age: 20, favoriteFoods: ["mlawi"] },
  { name: "mohamed",email: "mohamed@gmail.com" ,age: 22, favoriteFoods: ["spagetti" , "salade"] },
];

const createManyPeople = (users, done) => {
  Person.create(users, (err, user) => {
    if (err) return console.log(err);
    done(null, user);
  });
};

//Use model.find() to Search Your Database


const FindPerson = (PersonName) => {
  let FoundPerson = Person.find({ name: PersonName });
  if (err) return console.log(err);
  return FoundPerson;
};


//Use model.findOne() to Return a Single Matching Document from Your Database



const FindPersonWithFood = (Food) => {
  let FoundPerson = Person.findOne({ FavoriteFoods: Food });
  if (err) return console.log(err);
  return FoundPerson;
};



//Use model.findById() to Search Your Database By _id



const FindPersonWithId = (personId) => {
  let FoundPerson = Person.findById({ _id: personId });
  if (err) return console.log(err);
  return FoundPerson;
};

//Perform Classic Updates by Running Find, Edit, then Save


const EditSave = (personId, foodToAdd) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    data.FavoriteFoods.push(foodToAdd);
    data.save((err, dataNext) =>
      err
        ? console.error("error saving data: ", err.message)
        : done(null, dataNext)
    );
  });
};

//Perform New Updates on a Document Using model.findOneAndUpdate()

const findAndUpdate = (personName, ageToSet) => {
  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageToSet } },
    { new: true },
    (err) => {
      console.log(err);
    }
  );
};

//Delete One Document Using model.findByIdAndRemove

const removeById = (personId) => {
  Person.findByIdAndRemove(personId, (err) =>
    err ? console.log(err) : console.log("done")
  );
};

//MongoDB and Mongoose - Delete Many Documents with model.remove()


const removeManyPeople = (done) => {
    const nameToRemove = "mouna";
    Person.remove({ name: nameToRemove }, (err, data) =>
      err ? done(err, data) : done(null, data)
    );
  };

// Search Query Helpers to Narrow Search Results


  const searchSort = (done) => {
    const foodToSearch = "salade";
    Person.find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec((err, dataNext) =>
        err
          ? console.error("error getting data: ", err.message)
          : done(null, dataNext)
      );
  };

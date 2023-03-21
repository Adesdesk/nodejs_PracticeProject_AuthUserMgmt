const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{

  // get all the user information using JSON string.

  res.send(JSON.stringify(friends,null,4));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  res.send(friends[email])
});


// POST request: To add a new friend
router.post("/",(req,res)=>{
  if (req.body.email){
    friends[req.body.email] = {
        "firstName":req.body.firstName,
        "lastName":req.body.lastName, // similarly for lastName
        "DOB":req.body.DOB, // similarly for DOB
        }
      }
  res.send("The user" + (' ')+ (req.body.firstName) + " Has been added!");//This line is to be replaced with actual return value
});


// PUT request: Update the details of a friend with email id
router.put("/:email", function (req, res) {
  const email = req.params.email;
  let friend = friends[email]
  if (friend) { //Check is friend exists
      let DOB = req.body.DOB;
      let firstName = req.body.firstName; // similarly for firstName
      let lastName = req.body.lastName; // similarly for lastName

      //if DOB has been changed, update the DOB

      if(DOB) {
          friend["DOB"] = DOB
      }
      // if firstName has been changed, update the firstName
      if(firstName) {
        friend["firstName"] = firstName
      }
      // if lastName has been changed, update the lastName
      if(lastName) {
        friend["lastName"] = lastName
      }
      friends[email]=friend;
      res.send(`Friend with the email  ${email} updated.`);
  }
  else{
      res.send("Unable to find friend!");
  }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email;
    if (email){
        delete friends[email]
    }
  res.send(`Friend with the email  ${email} deleted.`);
});

module.exports=router;

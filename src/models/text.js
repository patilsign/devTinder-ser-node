data =
{
     userId: "674abc476f9ada950549ee0f",
     firstName: "Laxman",
     //gender: "female"
}

const ALLOW_FIELDS = ['userId', 'firstName', 'lastName', 'about', 'photoUrl', 'skills', 'password'];
const isEmailAllowed = Object.keys(data).every(checkFields);
function checkFields(k) {
     return ALLOW_FIELDS.includes(k);
}
console.log(isEmailAllowed, "-------------");
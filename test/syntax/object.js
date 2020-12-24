var roles = {
    "programmer" : "egoing",
    "designer" : "d8805",
    "manager" : "hoya"
};
//console.log(roles["designer"]);
for (var name in roles) {
    console.log("key: ", name); // name: key
    console.log("val: ", roles[name]);
}
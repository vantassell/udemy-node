module.exports.add = (x, y) => x + y;

module.exports.asyncAdd = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 500);
};

module.exports.asyncSquare = (a, callback) => {
    setTimeout(() => {
        callback(a * a);
    }, 500);
}

module.exports.setName = (user, fullName) => {
    const names = fullName.split(' ');
    user.firstName = names[0];
    user.lastName = names[1];
    return user
};

function getUserInfo(user) {
  return {
    name: user.name,
    email: user.email,
    id: user.id || user._id,
  }
}

module.exports = getUserInfo
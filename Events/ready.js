module.exports = async(client) => {
  client.user.setPresence({
      status: 'online'
  })
};
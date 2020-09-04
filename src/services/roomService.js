const getLocalRoom = (roomCode) => {
  try {
    var file = require(`../../rooms/${roomCode}.json`);
  } catch (e) {
    return null;
  }
  return file;
};

export { getLocalRoom };

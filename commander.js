const { exec } = require('child_process');

const executeCommand = (cmd, successCallback, errorCallback) => {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      if (errorCallback) {
        errorCallback(error.message);
      }
      return;
    }
    if (stderr) {
      if (errorCallback) {
        errorCallback(stderr);
      }
      return;
    }
    if (successCallback) {
      successCallback(stdout);
    }
  });
};

module.exports = { executeCommand };

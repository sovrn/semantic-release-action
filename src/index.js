const core = require('@actions/core');
const {
  handleDryRunOption,
} = require('./handleOptions');
const setUpJob = require('./setUpJob.task');
const windUpJob = require('./windUpJob.task');

/**
 * Release main task
 * @returns {Promise<void>}
 */
const release = async () => {
  await setUpJob();

  const semanticRelease = require('semantic-release');
  const result = await semanticRelease({
    ...handleDryRunOption(),
  });

  await windUpJob(result);
};

module.exports = () => {
  core.debug('Initialization successful');
  release().catch(core.setFailed);
};

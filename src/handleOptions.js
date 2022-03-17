const core = require('@actions/core');
const inputs = require('./inputs.json');

/**
 * Handle DryRun Option
 * @returns {{}|{dryRun: boolean}}
 */
exports.handleDryRunOption = () => {
  const dryRun = core.getInput(inputs.dry_run);

  switch (dryRun) {
    case 'true':
      return {dryRun: true};

    case 'false':
      return {dryRun: false};

    default:
      return {};
  }
};

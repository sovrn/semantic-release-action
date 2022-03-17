# Semantic Release Action
![][version-image]
![][workflows-badge-image]
[![Release date][release-date-image]][release-url]
[![semantic-release][semantic-image]][semantic-url]
[![npm license][license-image]][license-url]

GitHub Action for [Semantic Release][semantic-url].

## Usage
### Step1: Set any [Semantic Release Configuration](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration) in your repository.

### Step2: [Add Secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) in your repository for the [Semantic Release Authentication](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/ci-configuration.md#authentication) Environment Variables.

### Step3: Add a [Workflow File](https://help.github.com/en/articles/workflow-syntax-for-github-actions) to your repository to create custom automated processes.

#### Basic Usage:
```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v2
  - name: Semantic Release
    uses: sovrn/semantic-release-action@v2
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**IMPORTANT**: `GITHUB_TOKEN` does not have the required permissions to operate on protected branches.
If you are using this action for protected branches, replace `GITHUB_TOKEN` with [Personal Access Token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line). If using the `@semantic-release/git` plugin for protected branches, avoid persisting credentials as part of `actions/checkout@v2` by setting the parameter `persist-credentials: false`. This credential does not have the required permission to operate on protected branches.

#### Private Packages

If you are using this action to publish to the npm [GitHub Packages Registry][github-packages-registry],
then make sure that you configure this in your `package.json` file:

```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### Inputs
| Input Parameter   | Required | Description |
|:-----------------:|:--------:|-------------|
| dry_run           | false    | Whether to run semantic release in `dry-run` mode. [[Details](#dry_run)] |


#### dry_run
> {Optional Input Parameter} Whether to run semantic release in `dry-run` mode.<br>It will override the dryRun attribute in your configuration file.

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v2
  - name: Semantic Release
    uses: cycjimmy/semantic-release-action@v2
    with:
      dry_run: true
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Outputs
| Output Parameter          | Description |
|:-------------------------:|---|
| new_release_published     | Whether a new release was published (`true` or `false`) |
| new_release_version       | Version of the new release. (e.g. `1.3.0`) |
| new_release_major_version | Major version of the new release. (e.g. `1`) |
| new_release_minor_version | Minor version of the new release. (e.g. `3`) |
| new_release_patch_version | Patch version of the new release. (e.g. `0`) |
| new_release_channel       | The distribution channel on which the last release was initially made available (undefined for the default distribution channel). |
| new_release_notes         | The release notes for the new release. |
| last_release_version      | Version of the previous release, if there was one. (e.g. `1.2.0`) |

#### Using Output Variables:
```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v2
  - name: Semantic Release
    uses: cycjimmy/semantic-release-action@v2
    id: semantic   # Need an `id` for output variables
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

  - name: Do something when a new release published
    if: steps.semantic.outputs.new_release_published == 'true'
    run: |
      echo ${{ steps.semantic.outputs.new_release_version }}
      echo ${{ steps.semantic.outputs.new_release_major_version }}
      echo ${{ steps.semantic.outputs.new_release_minor_version }}
      echo ${{ steps.semantic.outputs.new_release_patch_version }}
```

## Changelog
See [CHANGELOG][changelog-url].

## License
This project is released under the [MIT License][license-url].

<!-- Links: -->
[version-image]: https://img.shields.io/github/package-json/v/cycjimmy/semantic-release-action

[workflows-badge-image]: https://github.com/cycjimmy/semantic-release-action/workflows/Test%20Release/badge.svg

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/semantic-release-action
[release-url]: https://github.com/cycjimmy/semantic-release-action/releases

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[license-image]: https://img.shields.io/npm/l/@cycjimmy/semantic-release-action.svg
[license-url]: https://github.com/cycjimmy/semantic-release-action/blob/master/LICENSE

[changelog-url]: https://github.com/cycjimmy/semantic-release-action/blob/master/docs/CHANGELOG.md

[github-packages-registry]: https://github.com/features/packages

# ACT-Rules Website

<!-- badges  -->

![](https://github.com/act-rules/act-rules-web/workflows/build/badge.svg)
![](https://github.com/act-rules/act-rules-web/workflows/publish/badge.svg)

This repository builds the website for [ACT-Rules community website](https://act-rules.github.io/).

## Adding An Implementation

### Step 1: Providing a URL

All ACT implementations require a valid report using the [JSON+EARL data format](https://act-rules.github.io/pages/implementations/earl-reports/), available from a permanent URL. An implementation vendor can either host the JSON report on a web server they control, or they can upload the report in a GitHub repository.

Organizations that do not maintain their own GitHub repository can request the chairs of the ACT-Rules community group for access to a repository in the [ACT Rules GitHub organization](https://github.com/act-rules/).

When using a GitHub repository, a raw GitHub URL can be used. When using a GitHub URL, make sure to use one that includes a branch name so that the URL won't need to be updated when the report is updated. An example of such a URL is the following, used by QualWeb: `https://raw.githubusercontent.com/act-rules/act-rules-implementation-qualweb/master/reports/qualweb-report.json`

### Step 2: Update `implementations.yml`

On a local branch, edit the [`implementations.yml`](./implementations.yml) file in the root of this repository; it contains a list of all implementations on the ACT Rules website. Copy an existing implementation and adjust the properties as needed. The `description` property is optional, although we strongly recommend providing this too.

### Step 3: Test the implementation

To make sure the implementation works, you can run the following command locally:

```
npm run getData:implementations:after
```

Check that the script does not return any error, and that a file is created for the new implementation in `_data/implementations/`. If an error occurs, this is most likely due because of an issue in the EARL+JSON format.

### Step 4: Push and publish

Create a pull request including the changes to `implementations.yml` and request a review from one of the ACT-Rules chairs. Once merged, the new integration will be published the next time the publish script of `act-rules/act-rules.github.io` runs.

# Netlify Plugin - Form Submissions

This [plugin](https://www.netlify.com/build/plugins-beta?utm_source=github&utm_medium=plugin-formsubmissions-pnh&utm_campaign=devex) adds the ability to fetch all submissions made to [Netlify Forms](https://www.netlify.com/products/forms/?utm_source=github&utm_medium=plugin-formsubmissions-pnh&utm_campaign=devex) in your site and stash them as JSON files before your build runs making the data available to your static site generator at build time.

## Overview

This plugin uses the Netlify API to request the data submitted to your forms. It can be configured to request the data from all forms, or from forms with specific names.

You can also configure this plugin to present the gathered data in the appropriate location, so your chosen [static site generator](https://www.netlify.com/blog/2020/04/14/what-is-a-static-site-generator-and-3-ways-to-find-the-best-one/?utm_source=github&utm_medium=plugin-formsubmissions-pnh&utm_campaign=devex) can leverage it during the build.



## Installation

To include this plugin in your site deployment:


### 1. Add the plugin as a dependency

```bash

# Add the plugin as a dependency of your build
npm i --s netlify-plugin-form-submissions

```


### 2. Add the plugin and its options to your netlify.toml

This plugin will fetch the submission to specified forms and stash the data prior to the execution of the `build` command you have specified in your Netlify configuration. You can choose which forms you want get the submission for, or just get them all by adding some config in the `netlify.toml` config file. The plugin will discover all the form present in your site.


```toml
# Config for the Netlify Build Plugin: netlify-plugin-form-submissions
[[plugins]]
  package = "netlify-plugin-form-submissions"

  [plugins.inputs]
    # Get submissions for specific forms
    # e.g. "form-name"
    # e.g. ["form-name-1", "form-name-2"]
    # e.g. "ALL"
    # default: "ALL"
    formNames = "my-snazzy-form"

    # the folder to receive a json file for each form
    dataDirectory = "site/_data"

```

### 3. Grant access via the Netlify API

The plugin uses the Netlify API to access your form submissions data and requires an access token to be stored as a site environment variable.

1. Visit your [Netlify User Settings](https://app.netlify.com/user/applications?utm_source=github&utm_medium=plugin-formsubmissions-pnh&utm_campaign=devex ) to create a new Personal access token
2. Create a `NETLIFY_AUTH_TOKEN` [environment variable in your site dashboard](https://docs.netlify.com/configure-builds/environment-variables/?utm_source=github&utm_medium=plugin-formsubmissions-pnh&utm_campaign=devex#declare-variables) containing this access token.
3. For local development, you may also wish to specify this environment variable in a local `.env` file (remember to add your `.env` file to your `.gitignore`)

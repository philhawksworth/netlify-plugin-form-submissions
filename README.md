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

This plugin will fetch the specified feeds and stash their data prior to the execution of the `build` command you have specified in your Netlify configuration. The desired feeds can be specified in the `netlify.toml` config file.


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

const fs      = require('fs');
const fetch   = require('node-fetch');
const chalk   = require('chalk');


// gather our environment variables
require('dotenv').config()
const {
  NETLIFY_AUTH_TOKEN
} = process.env;

let formIDs = {};


const getFormSubmissions = async function(formName, path) {
  let formID = formIDs[formName];
  const submissions = await fetch(`https://api.netlify.com/api/v1/forms/${formID}/submissions?access_token=${NETLIFY_AUTH_TOKEN}`).then(res => res.json());
  await fs.writeFileSync(path, JSON.stringify(submissions));
  console.log('Form submissions data saved:', chalk.yellow(path));
};


module.exports = {

  async onPreBuild({ inputs, utils, constants }) {


    // only proceed if an auth token has been set as an env var.
    if(!NETLIFY_AUTH_TOKEN){
      return utils.build.failPlugin(`The form-submission plugin requires access to the Netlify API via an NETLIFY_AUTH_TOKEN environment variable. Visit https://app.netlify.com/user/applications to create a personal access token and save it as an environment variable called NETLIFY_AUTH_TOKEN before retrying`);
    }

    // Fetch the data about what forms exist for this site
    const forms = await fetch(`https://api.netlify.com/api/v1/sites/${constants.SITE_ID}/forms?access_token=${NETLIFY_AUTH_TOKEN}`)
      .then(res => res.json())
      .catch(err => {
        utils.build.failPlugin(`Failed to get data about this site's forms from the Netlify API. Continuing with build, but form data may be missing which might cause problems.\n\n ${err}`);
      });

    // build an index object of the form names and their IDs
    console.log(chalk.green(`Forms found in the site: ${forms.length}`));

    // No forms? Nothing to do.
    if(!forms.length) {
      return;
    }

    // Output some form summary info for what we found
    forms.forEach(form => {
      console.log(chalk.green(form.name), `(${form.id})` );
      formIDs[form.name] = form.id;
    });

    // get submissions to specified forms or all forms?
    const chosenForms = inputs.formNames == 'ALL' ? Object.keys(formIDs) : [].concat(inputs.formNames)

    // get submissions to each form in parallel
    const promises = chosenForms.map((formName) => {
      const dataFilePath = `${inputs.dataDirectory}/${formName}_submissions.json`;
      return getFormSubmissions(formName, dataFilePath)
    });
    await Promise.all(promises);


  }
}

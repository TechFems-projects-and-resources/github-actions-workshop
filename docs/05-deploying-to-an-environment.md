# Lab 5: Continuous delivery - Deploying the app with Firebase

The goal of this lab is to show you how you could automate the deployment of the application to a specific environment, e.g. staging or production.

## Adding a deployment stage to our continuous deployment pipeline

In previous stages of the pipeline, we made sure the latest changes were integrated, the tests were passing and the application was built and packaged. That gives us enough confidence to **deploy the latest version of the application to a deployment environment**.

Think about it, when do the latest code changes start delivering value? Is it when they are tested and the application is built, or is it when they are deployed and released to the end users?

This stage of the pipeline is a bit more complicated. So far we have been running commands only in the GitHub Actions worker machines. To automate a deployment we need to trigger an action in an external service, the one providing the deployment environment. We need to authenticate with the service where we will deploy our app.

For the scope of this tutorial, we will use Firebase (a hosting service provided by Google). You can think of Firebase as a free server where you can expose your app to real users.    
If you don't have a Firebase account and don't want to create one, it is fine! No worries. You can start with [option 1](#51---option-1-lets-simulate-a-deployment) in this lab where we simulate a deployment.    
If you have a Firebase account or are ready to create one (for free), skip option 1 and go directly [option 2](#52---option-2-lets-perform-a-real-deployment-with-firebase)!

*Please note: Due to our limited timeframe, we will be deploying directly to a production environment. In real-world scenarios, most organizations initially deploy to a testing and/or staging environment.*

## 5.1 - Option 1: Let's simulate a deployment

Let's start by adding a new script to our `package.json` file. This task will automate the process of performing a deployment to a specific environment. Your `scripts` section in the package.json file should now look like this:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "deploy:simulate": "./scripts/simulate-deployment.sh"
},
```

When executed, this new npm task, `deploy:simulate`, will call a script that simulates a deployment and tells when the deployment is completed.     
Let's try to execute the automated deployment process locally and see what happens. In your terminal, run:

```bash
npm run deploy:simulate -- production
```

If you get an error "sh: scripts/simulate-deployment.sh: Permission denied", run this first command and again the previous one:
```bash
chmod +x scripts/simulate-deployment.sh
npm run deploy:simulate -- production
```


### Adding a deployment stage to our continuous delivery process

So far so good, we automated our deployment process so that we can run it from our local environment. The next step is to perform the automated deployment as part of the pipeline. Let's add a new job that allows us to deploy our app to an environment that we will call production. Let's add a new job:

```yaml
jobs:
    [....]
    deploy-prod-simulation:
      name: Simulate deploy to prod
      needs: build
      runs-on: ubuntu-latest
      steps:
        - name: Checkout code
          uses: actions/checkout@v2
        - name: Deploy with Node.js ${{ env.NODE_VERSION }}
          uses: actions/setup-node@v1
          with:
            node-version: ${{ env.NODE_VERSION }}
        - name: Download build artifact
          uses: actions/download-artifact@v3
          with:
            name: react-app-v${{ github.sha }}
            path: build
        - name: Deploy to prod environment
          run: npm run deploy:simulate -- production
```
*Tip: YAML is a file format that is whitespace-sensitive. To make sure that your YAML is properly indented and avoid any error, you can use an online yaml validator like this one: [https://jsonformatter.org/yaml-validator](https://jsonformatter.org/yaml-validator).* 

### Let's test our new pipeline stage

Commit and push your changes:
```bash
git add .
git commit -m "Add deployment simulation stage to the CI/CD pipeline"
git push
```

Now check the pipeline execution in the Actions tab. You should see an additional step called `deploy-prod-simulation`. Well done!


&nbsp; &nbsp; 

## 5.2 - Option 2: Let's perform a real deployment with Firebase

### First, add Firebase setup:

- Install the Firebase CLI if you haven’t already by running `npm install -g firebase-tools`    
- [Sign up](https://console.firebase.google.com/) for a Firebase account and create a new project     
- Run `firebase login:ci` in the terminal and login with your previous created Firebase account
- Copy token that appears in your console output

Next, we need to set up Firebase in the project folder: run the `firebase init` command from your project’s root. It will show you the prompt and you need to select:
- Hosting: “Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys”
- “use an existing project” and choose the Firebase project you created in the previous step
- agree with database.rules.json being created
- choose "build" as the public directory
- select no to the question rewrite all the urls
  select no for all the other questions
  
<img width="500" alt="image" src="https://github.com/caprosset/github-actions-repository/assets/12846321/fbea7d5c-c238-4679-aff1-1270c5d6beac">     



Now you should see the new file called `firebase.json` with some settings, as well as the `.firebaserc` file in the root folder of our project.

Commit and git push:
```bash
git add .
git commit -m "Add firebase setup"
git push
```

### Adding a deployment stage to our continuous delivery process

Add a new job (or replace the one added in Option 1) that will allow us to deploy our app to an environment that we will call production:

```yaml
jobs:
  [...]
  deploy-prod-firebase:
    name: Deploy to prod on Firebase
    needs: build
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
        uses: actions/checkout@v2
      - name: Deploy with Node.js ${{ env.NODE_VERSION }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ env.NODE_VERSION }}
      - name: Download build artifact
        uses: actions/download-artifact@v3
        with:
          name: react-app-v${{ github.sha }}
          path: build
      - name: Deploy to prod environment on Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```
*Tip: YAML is a file format that is whitespace-sensitive. To make sure that your YAML is properly indented and avoid any error, you can use an online yaml validator like this one: [https://jsonformatter.org/yaml-validator](https://jsonformatter.org/yaml-validator).* 

### Let's test our new pipeline stage

Commit and push your changes:

```bash
git add .
git commit -m "Add Firebase deployment stage to the CI/CD pipeline"
git push
```

The pipeline should fail because of a missing Firebase token. Let's fix it!   

In the repo settings, go to 'Secrets and variables' > 'Actions' and create a new repository secret. Call it `firebase token` and paste the token value that you got during the Firebase setup. Click 'add secret'.

<img width="900" alt="image" src="https://github.com/caprosset/github-actions-repository/assets/12846321/78021ed9-400f-41f7-9aee-c5cd717f577d">

<img width="900" alt="image" src="https://github.com/caprosset/github-actions-repository/assets/12846321/b0b644f5-674d-449e-b88f-a0fe6a833b2e">

Re-run the failed job and see the pipeline pass!

<img width="332" alt="image" src="https://github.com/caprosset/github-actions-repository/assets/12846321/4825c4f6-f518-47ab-8c84-17a755090beb">

Now you can open the URL that appears in the pipeline logs to see your app running in production. Et voilà!

![image](https://github.com/caprosset/github-actions-repository/assets/12846321/74df0604-57cc-4574-9bc8-8ad964b08425)


&nbsp; &nbsp; 

## Lab checklist

- [x] Read the instructions
- [ ] Option 1 - Add the deploy: simulate deployment tasks in the NPM scripts declaration
- [ ] Option 2 - Create a Firebase account and configure it
- [ ] Add the automated deployment job to the CD pipeline
- [ ] Push the changes and check the pipeline logs in the Actions tab
- [ ] Answer this question: is the pipeline implementing continuous delivery or continuous deployment?

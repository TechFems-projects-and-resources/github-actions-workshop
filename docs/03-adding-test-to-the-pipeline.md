# Lab 3: Continuous integration - Testing the app

The goal of this lab is to create the first stage in our CD pipeline, the test step. We will use what we learned in lab 2 and replace our Hello World pipeline with something more useful.

> Please make sure that you have completed the previous lab before continuing with this one

## 3.1 - Adding a testing stage to our continuous integration process

First, we need to specify which version of Node.js we will need. We can do that by declaring an environment variable that we can reference later on. Add these lines above `jobs`:

```yml
env:
  NODE_VERSION: "18.18"
```

The next step is to simply specify the test job and add it to the pipeline definition:

```yml
jobs:
  [...]
  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Setup Node.js ${{ env.NODE_VERSION }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ env.NODE_VERSION }}
      - name: Run unit tests
        run: |
          npm ci
          npm run test
```
*Tip: YAML is a file format that is whitespace-sensitive. To make sure that your YAML is properly indented and avoid any error, you can use an online yaml validator like this one: [https://jsonformatter.org/yaml-validator](https://jsonformatter.org/yaml-validator).*


### Pipeline Concepts

- **_env_**: specifies environment variables that can be reused across the pipeline definition.
- **_uses_**: specifies already defined GH Actions. You can think of these as reusable actions that you can incorporate in your pipeline, e.g. checkout, setup-node...
- **_with_**: used to pass parameters to already defined GH Actions.

## 3.2 - Let's test our new pipeline stage

Commit and push your changes:

```bash
git add .
git commit -m "Add test stage to the CI pipeline"
git push
```

Now check the pipeline execution in the Actions tab. You should see an additional step:

<img width="900" alt="image" src="https://github.com/caprosset/github-actions-repository/assets/12846321/21e0a02e-ed85-4da1-8314-1401904986b8">

It seems that our test is passing and the pipeline is green!

## 3.3 - [OPTIONAL] Make the test fail and see the pipeline turning red

In the src/App.test.js file, change line 7 by:
```javascript
expect(linkElement).not.toBeInTheDocument();
```

Commit and push the changes:
```bash
git add .
git commit -m "Make the test fail"
git push
```

Go back to the pipeline execution in the Actions tab. The pipeline should be red:

<img width="900" alt="image" src="https://github.com/caprosset/github-actions-repository/assets/12846321/5f4c5004-6455-4107-9747-e705e1493685">

We will need this step to pass for the next exercises. **Let's fix the test and get a green pipeline**! 

First, fix the test by reverting changes in line 7 of the src/App.test.js file:
```javascript
expect(linkElement).toBeInTheDocument();
```

Commit and push the changes:
```bash
git add .
git commit -m "Fix test"
git push
```
...and **make sure the pipeline is back to green!**

## Lab checklist

- [x] Read the instructions
- [ ] Replace the hello world job with the new test job
- [ ] Push the changes and check the pipeline execution in the Actions tab
- [ ] Optional: Make the test fail, commit, and push the changes. Check what happens.

# Lab 4: Continuous integration - Building and packaging the app

The goal of this lab is to show you how to add a stage in our pipeline to build and package the app.

> Please make sure that you have completed the previous labs before continuing with this one


## 4.1 - Adding a build stage to our continuous integration process

In the previous stage of our pipeline, we made sure that the latest code changes were integrated and that the test was passing. The next step is to **build and package a new version of our application**.    

Wait, what? Let's review first some concepts: building and packaging an application refers to the process of compiling the source code of an application, along with any dependencies and assets, into a deployable format. This format could be an executable file, a package, or a container image, depending on the type of application and the target environment.

Now we can continue! We will add a new job called `build` that will contain the following steps:

```yaml
jobs:
  [....]
  build:
    name: Build
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Setup Node.js ${{ env.NODE_VERSION }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ env.NODE_VERSION }}
      - name: Build the application
        run: |
          npm ci
          npm run build
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
         name: react-app-v${{ github.sha }}
         path: build
```

As you can see, we added a step to build the application and its dependencies with NPM. Finally, we use the upload-artifact Github Action to upload a build artifact that contains the code of the application.

*Tip: YAML is a file format that is whitespace-sensitive. To make sure that your YAML is properly indented and avoid any error, you can use an online yaml validator like this one: [https://codebeautify.org/yaml-validator](https://codebeautify.org/yaml-validator).*

&nbsp; 

## 4.2 - Let's test our new pipeline stage

Commit and push your changes: 

```bash
git add .
git commit -m "Add build stage to the CI pipeline"
git push
```

The pipeline should run automatically (because as you remember, we specified that it should run "on: push").       

Open your Github repo in the browser, click on the Actions tab, and check the pipeline execution. You should now see the `Build` stage in addition to the previous ones:

<img width="900" alt="image" src="https://github.com/caprosset/github-actions-repository/assets/12846321/7cc0068c-15d5-4c5e-8aa5-1030ad5f2671">


## Lab checklist

- [x] Read the instructions
- [ ] Add the build job to the CD workflow
- [ ] Push the changes and check the pipeline logs in the Actions tab
- [ ] Think about other tasks that could be automated as part of the build stage in the pipeline

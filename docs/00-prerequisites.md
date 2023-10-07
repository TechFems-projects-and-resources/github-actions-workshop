# Prerequisites

This tutorial uses [npm](https://www.npmjs.com/) (Node Package Manager) as a build tool. Before you can run this project, you will need to:   


### 1. Have `Node.js` installed on your computer

This workshop will use [NPM](https://www.npmjs.com/) (Node Package Manager) as a build tool.
First **verify that you have `Node.js` installed on your machine** by running the following command in your terminal:
```
node -v
```
  #### 1.1 - `Node.js` is already installed
  ... if the previous command returns a number, which is the version number of `Node.js` that is installed on your system. In that case, **you can go directly to step 1.3**.
  
  #### 1.2 - `Node.js` is not installed
 ... if the previous command is not recognized, and you see an error message indicating that the command is not found. 
 In that case, you will need to **install `Node.js`: find instructions on [how to install Node.js](https://nodejs.org/en/download/)** on the official website. 

Once `Node.js` is installed, you can **verify installation by re-running the previous command**:  
```
node -v
```

*Note: it's generally a good practice to use the even-numbered Node.js versions with LTS (Long Term Support) status and marked 'Recommended for Most Users' on the [download page](https://nodejs.org/en/download). Versions like 14.x.x LTS, 16.x.x LTS, 18.x.x LTS, and similar are suitable for learning and deploying projects in production (which we will do on Sunday!)*


#### 1.3 - Verify `NPM` installation
`NPM` comes with `Node.js` and is pre-installed with `Node`. If it is correctly installed, entering the following command in your terminal should **display the `NPM` version installed on your system**:
```
npm -v
```
To make sure it is up to date, you can download the latest version of `npm` by running the following command:
```
npm install -g npm@latest
```
&nbsp; &nbsp;

### 2. Git and Github 

As you can imagine at this point of the workshop, we will be playing with a special feature of GitHub called [GitHub Actions](https://github.com/features/actions). That's why you will also need to:


#### 2.1 - Have `git` installed on your computer

First, **verify your current version of `git`** by running the following command in a terminal:
```
git --version
```

If this command is not recognized, you will need to **install `git` on your computer. Find instructions on [how to install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)** on the official website.

*Note: as you probably know, [Git](https://git-scm.com/) is a version control system that tracks changes in your code, allowing you to collaborate with others and revert to previous states if something goes wrong, helping you manage your project's history effectively on your local machine.*
 
#### 2.2 - Have a GitHub account

If you haven’t already, **create a GitHub account [here](https://github.com/signup)** 🐙    
If needed, you can find more information about how to do so on [the official documentation](https://docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account). 

*Note: [GitHub](https://github.com/) is the web-based platform that uses `git` for version control, enabling you to store your code projects online in Git repositories. It provides a graphical interface for managing your code, collaborating with others, and offers additional features like issue tracking and pull requests, making it easier to work together on software development projects.*

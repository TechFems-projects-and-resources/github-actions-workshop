import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1 className="title">Automate your deployment process using Github Actions</h1>
      <h2>Welcome to our demo app!</h2>
      <p className="description">
        Let's apply what we just learnt about Continuous Integration (CI) and Continuous Delivery (CD) <br />and set up a deployment pipeline with Github Actions.
      </p>
      <img src="https://i.pinimg.com/originals/2d/8e/e8/2d8ee815146390d567706f2c7b5c2916.gif" />
      <div className="cta-container">
        <a href="https://github.com/caprosset/github-actions-repository/blob/master/docs/02-creating-your-first-github-workflow.md" target="_blank" className="cta-button">
          Get Started
        </a>
      </div>
    </div>
  );
};


export default App;

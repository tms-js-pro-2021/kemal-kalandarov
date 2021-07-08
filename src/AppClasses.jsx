import React from "react";

class LoginButton extends React.Component {
  componentDidMount() {
    window.currentPage = 'login'
    console.log("mounted button");
    fetch()
    this.setState()
  }

  componentWillUnmount() {
    window.currentPage = ''
    console.log("unmounting button");
  }

  render() {
    console.log("rendered button");
    return <button {...this.props} />;
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "login222", password: "pwd" };
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick() {
    this.setState({ login: "" });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ login: "login" })}>mount</button>
        {this.state.login && (
          <LoginButton onClick={this.handleLoginClick}>
            {this.state.login}
          </LoginButton>
        )}
      </div>
    );
  }
}

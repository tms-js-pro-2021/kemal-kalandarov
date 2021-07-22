// eslint-disable-next-line max-classes-per-file
import React from 'react';

class LoginButton extends React.Component {
  componentDidMount() {
    window.currentPage = 'login';
    console.log('mounted button');
    fetch();
    this.setState();
  }

  componentWillUnmount() {
    window.currentPage = '';
    console.log('unmounting button');
  }

  render() {
    console.log('rendered button');
    return <button type="button" {...this.props} />;
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: 'login222', password: 'pwd' };
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick() {
    this.setState({ login: '' });
  }

  render() {
    const { login } = this.state;
    return (
      <div>
        <button type="button" onClick={() => this.setState({ login: 'login' })}>
          mount
        </button>
        {login && (
          <LoginButton onClick={this.handleLoginClick}>{login}</LoginButton>
        )}
      </div>
    );
  }
}

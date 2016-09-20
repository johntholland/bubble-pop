var ScoreButton = React.createClass
({
  getInitialState: function()
  {
    return {counter: 0};
  }, 
  
  handleClick: function()
  {
    this.setState({ counter: this.state.counter +1});
  },
  
  render: function()
  {
    return(<button onClick ={this.handleClick}>Score:{this.state.counter}</button>);
  }
});

//React.render(<ScoreButton />, document.getElementById("reactScore"));
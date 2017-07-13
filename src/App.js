import React from 'react';

const HOC = (InnerComponent) => class extends React.Component{
  constructor(){
    super();
    this.state = {count: 0}
  }
  update(){
    this.setState(
      {
        count: this.state.count + 1
      }
    )
  }
  componentWillMount(){
    //Should print twice. 1 for button, 1 for label
    console.log('Will Mount')
  }
  render(){
    return(
      <InnerComponent 
        {...this.props}
        {...this.state}
        update={this.update.bind(this)}
      />
    )
  }
}

class App extends React.Component{
  render(){
    return (
      <div>
        <Button>button</Button>
        <hr/>
        <LabelHOC>label</LabelHOC>
      </div>
    )
  }
}

const Button = HOC((props) => 
  <button onClick={props.update}>{props.children} - {props.count}</button>
)

class Label extends React.Component{
  componentWillMount(){
    console.log('label will mount')
  }
  render(){
    return (
      <label onMouseMove={this.props.update}>{this.props.children} - {this.props.count}</label>
    )
  }
}

const LabelHOC = HOC(Label);

// const Button = (props) => <button>{props.children}</button>
// *NOTE: Both button and labele do the same thing just differently
// class Label extends React.Component{
//   render(){
//     return (
//       <label>{this.props.children}</label>
//     )
//   }
// }

export default App;

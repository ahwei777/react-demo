import React from "react";


class Test extends React.Component {
  // 當此 component 被加入至畫面後要做的事
  componentDidMount() {
    console.log('test mount')
  }
  // 當此 component 被從畫面中移除後要做的事
  componentWillUnmount() {
    console.log('test unmount')
  }
  render() {
    return (
      <div>Test</div>
    )
  }
}

export default class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 1,
    };
    console.log('constructor')
  }

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }
  // react 內建函式，this 一定可以指向此 instance，不須額外綁定 this
  componentDidMount() {
    console.log('did mount', this.state)
  }
  // 當此 component 更新後要做的事
  componentDidUpdate(prevProps, prevState){
    console.log('prevState:', prevState);
    console.log('update!')
  }
  componentWillUnmount() {
    console.log('unmount')
  }
  // update 前可設定條件判斷：只在回傳結果為 true 時執行 update，如 memo 的方式用於避免 rerender
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.counter > 5) return false;
    return true;
  }
  render() {
    console.log('render')
    const { counter } = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>+1</button>
        counter: {counter}
        {counter == 1 && <Test />}
      </div>
    )
  }
};

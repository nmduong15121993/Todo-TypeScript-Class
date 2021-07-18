import * as React from 'react';

type TProps = {
  onAddTodo: (input: string) => void,
};

type TState = {
  input: string,
};

class InputTodo extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      input: '',
    };
    this.onAddTodoFn = this.onAddTodoFn.bind(this);

  };

  setInput(input: string) {
    this.setState({ input });
  };

  onChangeFn(target: EventTarget & HTMLInputElement) {
    this.setInput(target.value);
  };

  onAddTodoFn() {
    const { input } = this.state;
    this.props.onAddTodo(input);
    this.setInput('');
  };

  render() {
    return (
      <>
        <input
          type='text' 
          value={this.state.input}
          onChange={({ target }) => this.onChangeFn(target)}
        />
        <button
          type='button'
          onClick={this.onAddTodoFn}
        >
          Add
        </button>
      </>
    );
  };
};

export { InputTodo };
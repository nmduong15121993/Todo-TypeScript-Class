import * as React from "react";
import { InputTodo } from "./InputTodo";
import { TTodos } from "./type";
import { ListTodo } from "./ListTodo";

type TState = {
  todos: TTodos[];
};

class App extends React.Component<{}, TState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      todos: [],
    };
    this.onAddTodo = this.onAddTodo.bind(this);
  }

  setTodos(todos: TTodos[]) {
    this.setState({ todos });
  }

  onAddTodo(newInput: string) {
    let { todos } = this.state;
    todos.push({
      content: newInput,
      state: false,
    });
    this.setTodos(todos);
  }

  onChangeState(newState: boolean, index: number) {
    const todoClone = [...this.state.todos];
    todoClone[index].state = newState;
    this.setTodos(todoClone);
  }

  onDelete(index: number) {
    let todoClone = [...this.state.todos];
    todoClone.splice(index, 1);
    this.setTodos(todoClone);
  }

  onEdit(newTodo: string, index: number) {
    console.log({ edit: newTodo });
    let todoClone = [...this.state.todos];
    todoClone[index].content = newTodo;
    this.setTodos(todoClone);
  }

  render() {
    const { todos } = this.state;

    return (
      <>
        <InputTodo onAddTodo={this.onAddTodo} />
        {todos.map((item, index) => (
          <ListTodo
            key={`${item}-${index}`}
            todos={item}
            onChangeState={(newState) => this.onChangeState(newState, index)}
            onDelete={() => this.onDelete(index)}
            onEdit={(newTodo) => this.onEdit(newTodo, index)}
          />
        ))}
      </>
    );
  }
}

export { App };

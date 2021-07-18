import * as React from "react";
import { TTodos } from "./type";

type TProps = {
  todos: TTodos;
  onChangeState: (newState: boolean) => void;
  onDelete: () => void;
  onEdit: (newTodo: string) => void;
};

type TState = {
  isEdit: boolean;
  editTemp: string;
};

class ListTodo extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      isEdit: false,
      editTemp: "",
    };
    this.onChangeStateFn = this.onChangeStateFn.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onSaveEdit = this.onSaveEdit.bind(this);
  }

  setIsEdit(isEdit: boolean) {
    this.setState({ isEdit });
  }

  setEditTemp(editTemp: string) {
    this.setState({ editTemp });
  }

  onChangeStateFn(target: EventTarget & HTMLInputElement) {
    this.props.onChangeState(target.checked);
  }

  onToggle() {
    const { content } = this.props.todos;
    this.setEditTemp(content);
    this.showIsEdit();
  }

  showIsEdit() {
    const { isEdit } = this.state;
    this.setIsEdit(!isEdit);
  }

  onEditFn(target: EventTarget & HTMLInputElement) {
    this.setEditTemp(target.value);
  }

  onSaveEdit() {
    const { editTemp } = this.state;
    this.props.onEdit(editTemp);
    this.setEditTemp("");
    this.showIsEdit();
  }

  render() {
    const { content, state } = this.props.todos;
    const { isEdit, editTemp } = this.state;
    return (
      <>
        {isEdit ? (
          <>
            <input
              type="text"
              value={editTemp}
              onChange={({ target }) => this.onEditFn(target)}
            />
            <button type="button" onClick={this.onSaveEdit}>
              Save Edit
            </button>
          </>
        ) : (
          <div onClick={this.onToggle}>{content}</div>
        )}
        <button type="button" onClick={this.props.onDelete}>
          Delete
        </button>
        <input
          type="checkbox"
          checked={state}
          onChange={({ target }) => this.onChangeStateFn(target)}
        />
      </>
    );
  }
}

export { ListTodo };

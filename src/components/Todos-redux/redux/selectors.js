export const selectTodos = store => store.todoState.todos;
export const selectFilter = store => store.filterState.name;
export const selectUpdatingTodo = store => store.updatingTodoState;

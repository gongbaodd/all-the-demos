
function App() {
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <form action="">
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input type="text" id="new-todo-input" className="input input__lg" name="text" autoComplete="off" />
        <button type="submit" className="btn btn__primary btn__lg">Add</button>
      </form>
      <div className="filters btn-group stack-exception ">
        <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show</span>
          <span>all</span>
          <span className="visually-hidden">tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show</span>
          <span>Active</span>
          <span className="visually-hidden">tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show</span>
          <span>Completed</span>
          <span className="visually-hidden">tasks</span>
        </button>
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul role="list" className="todo stack-small">
        <li classname="todo stack-small">
          <div classname="c-cb">
            <input type="checkbox" id="todo-0" defaultChecked={true} />
            <label classname="todo-label" htmlfor="todo-0">Eat</label>
          </div>
          <div classname="btn-group">
            <button classname="btn">edit <span classname="visually-hidden">sleep</span></button>
            <button classname="btn">delete <span classname="visually-hidden">sleep</span></button>
          </div>
        </li>
        <li classname="todo stack-small">
          <div classname="c-cb">
            <input type="checkbox" id="todo-1" />
            <label classname="todo-label" htmlfor="todo-1">Sleep</label>
          </div>
          <div classname="btn-group">
            <button classname="btn">edit <span classname="visually-hidden">sleep</span></button>
            <button classname="btn">delete <span classname="visually-hidden">sleep</span></button>
          </div>
        </li>
        <li classname="todo stack-small">
          <div classname="c-cb">
            <input type="checkbox" id="todo-2" />
            <label classname="todo-label" htmlfor="todo-2">Repeat</label>
          </div>
          <div classname="btn-group">
            <button classname="btn">edit <span classname="visually-hidden">sleep</span></button>
            <button classname="btn">delete <span classname="visually-hidden">sleep</span></button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;

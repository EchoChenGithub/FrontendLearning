import { useState } from "react";

// 1.Basic useState Examples
// 1.1 Counter(number): the count state variable holds a number. clicking the button increments it.
function Counter() {
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count + 1);
    }
    return (
        <button onClick={handleClick}>
            You pressed the counter {count} times.
        </button>
    )
}

// 1.2 Text field(string): the text state variable holds a string. When you type, handleChange reads the latest input value from the browser input DOM element,and called setText to update the state.
function MyInput() {
    const [text, setText] = useState("");
    function handleChange(e) {
        setText(e.target.value)
    }
    return (
        <>
            <input type="text" value={text} onChange={handleChange} />
            <p>You typed: {text}</p>
            <button onClick={() => setText('hello')}>Reset</button>
        </>
    )
}

// 1.3 MyCheckbox(boolean): the checked state variable holds a boolean. When you click the checkbox, handleChange reads the latest input value from the browser input DOM element, and called setChecked to update the state.
function MyCheckbox() {
    const [checked, setChecked] = useState(true);
    function handleChange(e) {
        setChecked(e.target.checked);
    }
    return (
        <>
            <label>
                <input type="checkbox" checked={checked} onChange={handleChange} />
                I like this.
            </label>
            <p>You {checked ? 'liked' : 'did not like'} this.</p>
        </>


    )
}

// 1.4 Form(two variables): declare more than one state variable in the same component. Each state variable is completely independent.
function Form() {
    const [name, setName] = useState("Taylor");
    const [age, setAge] = useState(42);

    return (
        <>
            <label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <div>
                <button onClick={() => setAge(age + 1)}>
                    Increment age
                </button>
                <p>Hello, {name}. You are {age}</p>
            </div>
        </>
    )

}

// 2.Examples of objects and arrays in state
// 2.1 Form(object)
function FormObject() {
    const [form, setForm] = useState({
        firstName: 'Barbara',
        lastName: 'Hepworth',
        email: 'bhepworth@sculpture.com',
    });
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <>
            <label>
                First Name:
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
            </label>
            <br/>
            <label>
                Last Name:
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
            </label>
            <br/>
            <label>
                Email:
                <input type="text" name="email" value={form.email} onChange={handleChange} />
            </label>
            <p>
                {form.firstName} {form.lastName} ({form.email})
            </p>
        </>
    )
}

// 2.2 Form(nested object)
function FormNestedObject() {
    const [person, setPerson] = useState({
        name: 'Niki de Saint Phalle',
        artwork: {
            title: 'Blue Nana',
            city: 'Hamburg',
            image: 'https://i.imgur.com/Sd1AgUOm.jpg',
        }
    })

    function handleNameChange(evt) {
        setPerson({
            ...person,
            name: evt.target.value,
        });
    }
    function handleTitleChange(evt) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                title: evt.target.value,
            }
        })
    }
    function handleCityChange(evt) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                city: evt.target.value,
            }
        })
    }
    function handleImageChange(evt) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                image: evt.target.value,
            }
        })
    }

    return (
        <>
            <label>
                Name:
                <input
                    value={person.name}
                    onChange={handleNameChange}
                />
            </label>
            <label>
                Title:
                <input
                    value={person.artwork.title}
                    onChange={handleTitleChange}
                />
            </label>
            <label>
                City:
                <input
                    value={person.artwork.city}
                    onChange={handleCityChange}
                />
            </label>
            <label>
                Image:
                <input
                    value={person.artwork.image}
                    onChange={handleImageChange}
                />
            </label>
            <p>
                <i>{person.artwork.title}</i>
                {' by '}
                {person.name}
                <br />
                (located in {person.artwork.city})
            </p>
            <img
                src={person.artwork.image}
                alt={person.artwork.title}
            />
        </>
    )
}

// 2.3 List(array)
let nextId = 3
const initialTodos = [
    { id: 0, title: 'Buy milk', done: true },
    { id: 1, title: 'Eat tacos', done: false },
    { id: 2, title: 'Brew tea', done: false },
];
function ListArray() {
    const [todos, setTodos] = useState(initialTodos);

    function AddTodo({ onAddTodo }) {
        const [title, setTitle] = useState('');
        return (
            <>
                <input
                    placeholder="Add todo"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <button onClick={() => {
                    setTitle('');
                    onAddTodo(title);
                }}>Add</button>
            </>
        )
    }
    function TaskList({todos, onChangeTodo, onDeleteTodo}) {
        return (
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <Task
                            todo={todo}
                            onChange={onChangeTodo}
                            onDelete={onDeleteTodo}
                        />
                    </li>
                ))}
            </ul>
        );
    }
    function Task({ todo, onChange, onDelete }) {
        const [isEditing, setIsEditing] = useState(false);
        let todoContent;
        if (isEditing) {
            todoContent = (
                <>
                    <input
                        value={todo.title}
                        onChange={e => {
                            onChange({
                                ...todo,
                                title: e.target.value
                            });
                        }} />
                    <button onClick={() => setIsEditing(false)}>
                        Save
                    </button>
                </>
            );
        } else {
            todoContent = (
                <>
                    {todo.title}
                    <button onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                </>
            );
        }
        return (
            <label>
                <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={e => {
                        onChange({
                            ...todo,
                            done: e.target.checked
                        });
                    }}
                />
                {todoContent}
                <button onClick={() => onDelete(todo.id)}>
                    Delete
                </button>
            </label>
        );
    }

    function handleAddTodo (title) {
        setTodos([
            ...todos,
            {
                id: nextId++,
                title: title,
                done: false,
            },
        ]);
    }
    function handleChangeTodo (nextTodo) {
        setTodos(todos.map(t => {
            if (t.id === nextTodo.id) {
                return nextTodo;
            } else {
                return t;
            }
        }));
    }
    function handleDeleteTodo (todoId) {
        setTodos(todos.filter(t => t.id !== todoId));
    }

    return (
        <>
            <AddTodo
                onAddTodo={handleAddTodo}
            />
            <TaskList
                todos={todos}
                onChangeTodo={handleChangeTodo}
                onDeleteTodo={handleDeleteTodo}
            />
        </>
    )
}


// useState Practice: create a component that has a text input and a button. When you type in the input and click the button, the input value should be displayed in the component.
function useStatePractice() {
    return (
        <>
            <div className="basic-examples">
            <h2>Basic Examples</h2>
            <hr/>
            <h3>Example 1/4: Counter(number)</h3>
            <div className='counter'>
                <Counter />
            </div>
            <hr/>
            <h3>Example 2/4: Text field(string)</h3>
            <div className='myInput'>
                <MyInput />
            </div>
            <hr/>
            <h3>Example 3/4: MyCheckbox(boolean)</h3>
            <div className='mycheckbox'>
                <MyCheckbox />
            </div>
            <hr/>
            <h3>Example 4/4: Form(two variables)</h3>
            <div className='form'>
                <Form />
            </div>
        </div>
            <div className="'examples-object-array'">
                <h2>Examples of objects and arrays in state</h2>
                <hr/>
                <h3>Example 1/3: Form(object)</h3>
                <div className='form-object'>
                    <FormObject />
                </div>
                <hr/>
                <h3>Example 2/3: Form(nested object)</h3>
                <div className='form-nested-object'>
                    <FormNestedObject />
                </div>
                <hr/>
                <h3>Example 3/3: List(array)</h3>
                <div className='list-array'>
                    <ListArray />
                </div>
            </div>
        </>
    )
}

export default useStatePractice
import { useState, useEffect } from "react";

export default function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const [editToDo, setEditToDo] = useState(null);
    const [editText, setEditText] = useState("");

    const handleChange = (e) => {
        console.log("handleChange is working!");
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        console.log("handleSubmit is working!");
        e.preventDefault();

        const newToDo = {
            id: new Date().getTime(),
            text: input,
            completed: false,
        };

        setTodos([...todos].concat(newToDo));
        setInput("");
    };

    const deleteToDo = (id) => {
        console.log("delete button working!");
        const updatedTodos = [...todos].filter((todo) => todo.id !== id);

        setTodos(updatedTodos);
    };

    const handleToggle = (id) => {
        console.log("handleToggle is working!!");
        const updatedTodos = [...todos].map((todo) => {
            console.log("todo: ", todo);
            console.log("todo.id", todo.id);
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });

        setTodos(updatedTodos);
    };

    const submitEdit = (id) => {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.text = editText;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setEditToDo(null);
        setEditText("");
    };

    useEffect(() => {
        console.log("useEffect is working");
        const retrieveToDos = localStorage.getItem("todos");
        const loadedTaskes = JSON.parse(retrieveToDos);
        if (loadedTaskes) {
            setTodos(loadedTaskes);
        }
    }, []);

    useEffect(() => {
        console.log("useEffect is working ");
        const keepToDos = JSON.stringify(todos);
        localStorage.setItem("todos", keepToDos);
    }, [todos]);

    return (
        <div className="bg-white">
            <h1>To-Do's</h1>
            <div className="bg-warning">
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleChange} value={input} />
                    <button type="submit">Add To Do</button>
                </form>
                {todos.map((todo) => {
                    console.log("todo: ", todo);
                    console.log("todo.completed: ", todo.completed);
                    return (
                        <>
                            <div key={todo.id}>
                                {editToDo === todo.id ? (
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setEditText(e.target.value)
                                        }
                                        value={editText}
                                    />
                                ) : (
                                    <p>{todo.text}</p>
                                )}

                                <button onClick={() => deleteToDo(todo.id)}>
                                    Delete
                                </button>
                                <input
                                    type="checkbox"
                                    onChange={() => handleToggle(todo.id)}
                                    checked={todo.completed}
                                />
                                {editToDo === todo.id ? (
                                    <button onClick={() => submitEdit(todo.id)}>
                                        Submit Edit
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setEditToDo(todo.id)}
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
}

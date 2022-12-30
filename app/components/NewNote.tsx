import noteStyle from './NewNote.css';
import {Form, useTransition as useNavigation} from '@remix-run/react'
import {useEffect, useRef, useState} from "react";

function NewNote() {
    const [currentTodo, setCurrentTodo] = useState('');
    const [todos, setTodo] = useState([]);
    let formRef = useRef();
    const navigation = useNavigation();

    let isSubmitting = navigation.state === 'submitting';

    useEffect(() => {
        if(!isSubmitting) {
            formRef.current?.reset();
            setTodo([]);
        }
    },[isSubmitting])

    function addTodo() {
        todos.push(currentTodo);
        setTodo(todos)
        setCurrentTodo('')
    }

    function handleChange(event) {
        setCurrentTodo(event.target.value);
    }
    function handleKeyPress(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            addTodo();
        }
    }

    return (
        <Form ref={formRef} method="post" id="note-form">
            <p>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title"  />
            </p>
            <p>
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" rows={5}  />
            </p>
            <p>
                <label htmlFor="todos">To do</label>
                <textarea placeholder={"Click enter to add a new to do"} rows={1} value={currentTodo} onChange={handleChange} onKeyPress={handleKeyPress}/>
            </p>
            {todos && <ul>
                {todos.map((todo: string, index: number) => (
                    <li>
                        <textarea className='todo' id="name" name="todos" defaultValue={todo}/>
                    </li>
                    ))}
            </ul> }
            <div className="form-actions">
                <button>Add Note</button>
            </div>
        </Form>
    );
}

export default NewNote;

export function links() {
    return [{rel: 'stylesheet', href: noteStyle}];
}


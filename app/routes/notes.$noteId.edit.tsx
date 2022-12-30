import { json } from '@remix-run/node';
import { Link, Form, useLoaderData } from '@remix-run/react';

import {getStoredNotes, storeNotes} from '~/data/notes';
import styles from '~/styles/note-details.css';
import {links as newNoteLink} from "~/components/NewNote";
import {redirect} from "@remix-run/router";
import {useState} from "react";


export default function NoteEdit() {
    const note = useLoaderData();
    const todos = note.todos;
    const [currentTodo, setCurrentTodo] = useState('');
    const [updatedTodos, setTodo] = useState(todos);

    function handleClick() {
        alert('clicked')
    }

    function addTodo() {
        updatedTodos.push(currentTodo);
        setTodo(updatedTodos);
        setCurrentTodo('');
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
        <main id="note-details">
            <header>
                <nav>
                    <Link to="/notes">Back to all Notes</Link>
                </nav>
            </header>
            <Form method="post" id="note-form">
                <p>
                    <label htmlFor="title">Title</label>
                    <input type="text" defaultValue={note.title} id="title" name="title"  />
                </p>
                <p>
                    <label htmlFor="content">Content</label>
                    <textarea id="content" name="content" defaultValue={note.content} rows={5}  />
                </p>
                <p>
                    <label htmlFor="todos">To do</label>
                    <textarea placeholder={"Click enter to add a new to do"} rows={1} value={currentTodo} onChange={handleChange} onKeyPress={handleKeyPress}/>
                </p>
                { (todos || updatedTodos) && <ul>
                    {todos.map((todo: any, index: number) => (
                        <li>
                            <textarea className='todo' id="name" name="todos" defaultValue={todo.todo || todo}/>
                        </li>
                    ))}
                </ul> }
                <div className="form-actions">
                    <button name={"id"} defaultValue={note.id}>Add Note</button>
                </div>
            </Form>
        </main>
    );
}

export async function loader({ params }: any) {
    let notes = await getStoredNotes();
    const noteId = Number(params.noteId);
    const selectedNote = notes.find((note: { id: number; }) => note.id === noteId);

    if (!selectedNote) {
        throw json(
            { message: 'Could not find note for id ' + noteId },
            { status: 404 }
        );
    }

    return selectedNote;
}

export async function action(data: any) {
    let storedNotes = await getStoredNotes();
    const formData = await data.request.formData();
    const noteData = Object.fromEntries(formData);
    let todos = formData.getAll("todos");
    let content = formData.get("content");
    let title = formData.get("title");
    const noteId = Number(formData.get("id"));
    const index = storedNotes.findIndex((note: { id: number; }) => note.id === noteId);
    let newNotes = storedNotes.splice(index, 1);

    let todoData: any[] = [];
    todos.map((todo: any, index: number) => {
        let todoObj = {id: String(index), todo: todo, status: false}
        todoData.push(todoObj)
    });
    noteData.todos = todoData;
    noteData.id = noteId
    newNotes.concat(noteData);

    let redirectionUrl = '/notes/'+ noteId;
    await storeNotes(newNotes);
    return redirect(redirectionUrl);

}

export function links() {
    return [{ rel: 'stylesheet', href: styles },...newNoteLink()];
}

export function meta({ data }: any) {
    return {
        title: data.title,
        description: 'Manage your notes with ease.',
    };
}


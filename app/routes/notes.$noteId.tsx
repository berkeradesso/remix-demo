import { json } from '@remix-run/node';
import { Link, Form, useLoaderData } from '@remix-run/react';

import {getStoredNotes, storeNotes} from '~/data/notes';
import styles from '~/styles/note-details.css';
import LoadedButton, {links as loadedButtonLink} from "~/components/ExplosiveButton";
import {redirect} from "@remix-run/router";


export default function NoteDetails() {
    const note = useLoaderData();
    const todos = note.todos;

    function handleClick() {
        alert('clicked')
    }

    return (
        <main id="note-details">
            <header>
                <nav>
                    <Link to="/notes">Back to all Notes</Link>
                </nav>
                <h1>{note.title}</h1>
            </header>
            <p id="note-details-content">{note.content}</p>
            {todos.map((todo:any, index: number) => (
                <>
                <LoadedButton data={todo} selectedNote={note}/>
                </>
            ))}
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
    let notes = await getStoredNotes();
    const formData = await data.request.formData();
    let ids = formData.get('id').split(',');

    notes.find((note: { id: number }) => note.id === Number(ids[0])).todos.find((todo: {id: string}) => todo.id === ids[1]).status
    = !(notes.find((note: { id: number }) => note.id === Number(ids[0])).todos.find((todo: {id: string}) => todo.id === ids[1]).status)

    let redirectionUrl = '/notes/'+ ids[0];
    await storeNotes(notes);
    return redirect(redirectionUrl);

}

export function links() {
    return [{ rel: 'stylesheet', href: styles },...loadedButtonLink()];
}

export function meta({ data }: any) {
    return {
        title: data.title,
        description: 'Manage your notes with ease.',
    };
}


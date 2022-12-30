import NewNote, {links as noteLinks} from "~/components/NewNote";
import NoteList, {links as noteListLinks} from "~/components/NoteList";
import {getStoredNotes, storeNotes} from "~/data/notes"
import {redirect} from "@remix-run/router";
import { useLoaderData, Outlet } from '@remix-run/react';

export default function NotesPage() {
const notes = useLoaderData()
    return (
        <main>
            <NewNote/>
            <NoteList notes = {notes}/>
        </main>
    );
}

export async function loader() {
    const notes = await getStoredNotes();
    return notes;
}

export async function action(data: any) {
    const storedNotes = await getStoredNotes();
    const formData = await data.request.formData();

    if(data.request.method === 'DELETE') {
        let noteId = formData.get('id');
      ;
        await storeNotes(storedNotes.filter(note => note.id !== Number(noteId)));
        return redirect('/notes');

    } else {
        const todos = formData.getAll("todos");
        let todoData: any[] = [];
        const noteData = Object.fromEntries(formData);
        todos.map((todo: any, index: number) => {
            let todoObj = {id: String(index), todo: todo, status: false}
            todoData.push(todoObj)
        });
        noteData.todos = todoData;
        noteData.id = storedNotes.length === 0 ? 100
        : storedNotes[storedNotes.length-1].id + 1
        noteData.date = new Date().toISOString()
        const newStoredNotes = storedNotes.concat(noteData);
        await storeNotes(newStoredNotes);
        return redirect('/notes');
    }
}

export function links() {
    return [...noteLinks(),...noteListLinks()]
}

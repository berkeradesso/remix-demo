import { Link, Form } from '@remix-run/react';

import styles from './NoteList.css';

function NoteList({ notes }: any) {
  return (
      <ul id="note-list">
        {notes.map((note: any, index: number) => (
            <li key={note.id} className="note">
              <Link to={String(note.id)}>
                <article>
                  <header>
                    <ul className="note-meta">
                      <li>#{note.id}</li>
                      <li>
                        <time dateTime={note.id}>
                          {new Date(note.id).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </time>
                      </li>
                    </ul>
                    <h2>{note.title}</h2>
                  </header>
                  <p>{note.content}</p>
                </article>
              </Link>
                <Form method='delete'>
                    <button type='submit' name='id' value={note.id} className="material-symbols-outlined">
                        delete
                    </button>
                </Form>
            </li>
        ))}
      </ul>
  );
}

export default NoteList;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

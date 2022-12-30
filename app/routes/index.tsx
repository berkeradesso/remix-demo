import { Link } from '@remix-run/react';
import homeStyle from '../styles/notes.css'


export default function Index() {
  return (
      <main id="content">
          <h1>Keep track of your note</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p id="cta">
              <Link to="/notes">Try Now!</Link>
          </p>
      </main>
  );
}

export function links() {
    return [{rel:'stylesheet', href: homeStyle}];
}

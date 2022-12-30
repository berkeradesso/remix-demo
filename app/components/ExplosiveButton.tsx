import loadedButtonStyle from "~/components/ExplosiveButton.css";
import {Form} from "@remix-run/react";

function LoadedButton({data, selectedNote}: any) {
    console.log(selectedNote)
    const ids = String(selectedNote.id + ',' + data.id)
    return (
        <Form method="put" id="todo-update">
            {data.status === true ?
                <>
                <div className="ana">
                    <span className="material-symbols-outlined done">done</span>
                    <button name='id' value={ids} className="btn btn1 done">{data.todo}</button>
                </div>
                </>
                :
                <>
                <div className="ana">
                    <span className="material-symbols-outlined unfinished">priority_high</span>
                    <button name='id' value={ids} className="btn btn1">{data.todo}</button>
                </div>
                </>
            }
        </Form>
    );
}

export default LoadedButton;

export function links() {
    return [{rel: 'stylesheet', href: loadedButtonStyle}];
}

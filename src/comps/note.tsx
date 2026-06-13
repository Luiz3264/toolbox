import { useEffect } from "react";

function save() {
  const textarea = document.getElementById(
    "notepad",
  ) as HTMLTextAreaElement | null;
  const note = textarea?.value ?? "";
  localStorage.setItem("notepad", note);
}

function Note() {
  useEffect(() => {
    const textarea = document.getElementById(
      "notepad",
    ) as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.value = localStorage.getItem("notepad") ?? "";
    }
  }, []);
  return (
    <div className="box">
      <h2>Notepad</h2>
      <textarea
        id="notepad"
        spellCheck="false"
        onChange={save}
        rows={8}
        cols={16}
      />
      <br />
    </div>
  );
}

export default Note;

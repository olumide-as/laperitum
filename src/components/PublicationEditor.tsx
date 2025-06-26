// components/PublicationEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function PublicationEditor({ content, onChange }: { content: string; onChange: (val: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <div className="border rounded-md p-3 min-h-[200px]">
      {editor && <EditorContent editor={editor} />}
    </div>
  );
}
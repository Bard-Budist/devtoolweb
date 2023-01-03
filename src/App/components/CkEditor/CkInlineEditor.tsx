import * as React from 'react';
import AllCkEditor from './AllCkEditor';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
interface CkInlineEditorProps {
    html: string;
    editor: string;
}
const CkInlineEditor = (props: CkInlineEditorProps) => {
    return (
        <AllCkEditor
            editor={InlineEditor}
            data={props.html}
            onReady={(editor: any) => {
                if (props.editor === 'document') {
                    const toolbarContainer = document.querySelector('.document-editor__toolbar');
                    if (toolbarContainer) {
                        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                    }
                }
                // console.log( 'Editor is ready to use!', editor );
            }}
            onChange={(event: any, editor: any) => {
                // const data = editor.getData();
                // console.log( { event, editor, data } );
            }}
            onBlur={(editor: any) => {
                // console.log( 'Blur.', editor );
            }}
            onFocus={(editor: any) => {
                // console.log( 'Focus.', editor );
            }}
        />
    );
};
export default CkInlineEditor;

import * as React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
const AllCkEditor = (props: { editor: any; data: any; onReady: any; onChange: any; onBlur: any; onFocus: any }) => {
    return <CKEditor {...props} />;
};
export default AllCkEditor;

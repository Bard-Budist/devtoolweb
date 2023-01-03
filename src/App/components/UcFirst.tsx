import * as React from 'react';
interface UcFirstProps {
    text: string;
}
const UcFirst = (props: UcFirstProps) => {
    return <>{props.text.charAt(0).toUpperCase() + props.text.slice(1)}</>;
};
export default UcFirst;

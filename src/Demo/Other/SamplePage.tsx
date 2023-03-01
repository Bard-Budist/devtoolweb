import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import { User } from '../../utils/user';

import Card from '../../App/components/MainCard';
const SamplePage = () => {

    return (
        <>
            <Row>
                <Col>
                    <Card title="Descripcion" isOption>
                        <p>Herramienta de desarrollo de Selecu</p>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default SamplePage;

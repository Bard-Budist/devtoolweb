import * as React from 'react';
import { useState } from 'react';
import { Row, Col, Card, Dropdown, Carousel, Form, Button } from 'react-bootstrap';
import { GetUser } from '../../utils/user';

import DEMO from '../../store/constant';
import avatar5 from '../../assets/images/user/user.png';
import { UserData } from '../../interfaces/UserInterfaces';
import { apiAuth } from '../../utils/api';
import { ProductInterface } from '../Utilities/Interfaces/updateCheckpointInterfaces';

const UserProfile = () => {
    const [data, setData] = useState({
        activeProfileTab: 'profile',
        isPersonalEdit: false,
        isContactEdit: false,
        isOtherEdit: false
    });
    const profileTabClass = 'nav-link text-reset';
    const profileTabActiveClass = 'nav-link text-reset active';
    const profilePanClass = 'tab-pane fade';
    const profilePanActiveClass = 'tab-pane fade show active';
    const [user, setUser] = useState<UserData>();
    const [products, setProducts] = React.useState<ProductInterface[]>([]);
    const [currentProduct, setCurrentProduct] = React.useState<string>('');
    const [checkpoint, setCheckpoint] = React.useState<string>('');

    React.useEffect(() => {
        const user = GetUser();
        if (user) {
            setUser(user);
            apiAuth.get('/user/products/' + user.id).then((response) => {
                setProducts(response.data);
            });
        }
    }, []);

    const getCheckpoint = () => {
        if (currentProduct !== '') {
            const payloadBody = {
                userId: user?.id,
                product: currentProduct
            };
            apiAuth.patch('/checkpoint-data/get', payloadBody).then((response) => {
                const result = response.data.data;
                setCheckpoint(JSON.stringify(result));
            });
        }
    };

    return (
        <>
            <div className="user-profile user-card mb-4">
                <Card.Header className="border-0 p-0 pb-0 pt-10">
                    <div className="cover-img-block">
                        <div className="overlay" />
                        <div className="change-cover"></div>
                    </div>
                </Card.Header>
                <Card.Body className="py-0">
                    <div className="user-about-block m-0">
                        <Row>
                            <Col md={4} className="text-center mt-n5">
                                <div className="change-profile text-center">
                                    <Dropdown className="w-auto d-inline-block">
                                        <Dropdown.Toggle as="a" variant="link" id="dropdown-basic">
                                            <div className="profile-dp">
                                                <div className="position-relative d-inline-block">
                                                    <img className="img-radius img-fluid wid-100" src={avatar5} alt="User" />
                                                </div>
                                            </div>
                                            <div className="certificated-badge">
                                                <i className="fas fa-certificate text-c-blue bg-icon" />
                                                <i className="fas fa-check front-icon text-white" />
                                            </div>
                                        </Dropdown.Toggle>
                                    </Dropdown>
                                </div>
                                <h5 className="mb-1">{user?.username}</h5>
                                <p className="mb-2 text-muted">{user?.roles}</p>
                            </Col>
                            <Col md={8} className="mt-md-5">
                                <ul className="nav nav-tabs profile-tabs nav-fill" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className={data.activeProfileTab === 'profile' ? profileTabActiveClass : profileTabClass}
                                            onClick={() => {
                                                setData({ ...data, activeProfileTab: 'profile' });
                                            }}
                                            id="profile-tab"
                                            href={DEMO.BLANK_LINK}
                                        >
                                            <i className="feather icon-user mr-2" />
                                            Perfil
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
            </div>
            <Row>
                <Col md={8} className="order-md-2">
                    <div className="tab-content">
                        <div className={data.activeProfileTab === 'profile' ? profilePanActiveClass : profilePanClass} id="profile">
                            <Card>
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <h5 className="mb-0">Checkpoint</h5>
                                </Card.Body>
                                <Card.Body>
                                    <Form.Group>
                                        <Form.Label>Temporada</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={currentProduct}
                                            onChange={(event) => {
                                                setCurrentProduct(event.target.value);
                                            }}
                                        >
                                            <option>Seleccione el producto</option>
                                            {products.map((product, i) => {
                                                return <option key={i}>{product.name}</option>;
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                    <Button onClick={getCheckpoint}>Consultar</Button>
                                    <hr />
                                    <Form.Control as="textarea" disabled={true} value={checkpoint} />
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Col>
                <Col md={4} className="order-md-1"></Col>
            </Row>
        </>
    );
};
export default UserProfile;

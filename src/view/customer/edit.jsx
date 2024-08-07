import React, { forwardRef } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { resources } from '../../store/resources';
import * as formik from 'formik';
import * as yup from 'yup';
import Select from '../../components/Select';
import useCustomer from '../../store/context/CustomerContext';

const Edit = forwardRef( ({  },ref) => {
    const { Formik } = formik;
    const {customer, loading, error, submitNewCustomer} = useCustomer();

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string(),
        phoneNumber: yup.string().required(),
        isVip: yup.boolean(),
        vipType: yup.string(),
        balance: yup.number(),
        firstLanguage: yup.string().required(),
        comingResource: yup.string().required(),
        birthday: yup.string(),
        note: yup.string(),
    });


    const initialValues = customer;
    const onFormSubmit = (values)=>{
        submitNewCustomer({data: values});
       
    }

    return (
        <Formik
        innerRef={ref}
        validationSchema={schema}
        onSubmit={onFormSubmit}
        initialValues={initialValues}
        >
        {({  handleChange, values, touched, errors }) => (
            <Form noValidate>
                {/* Basic information */}
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        isValid={touched.firstName && !errors.firstName}
                        isInvalid={touched.firstName && !!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        isValid={touched.lastName && !errors.lastName}
                        isInvalid={touched.lastName && !!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                    <Form.Label>Phone Number</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                        type="text"
                        placeholder="phone number"
                        aria-describedby="inputGroupPrepend"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        isValid={touched.phoneNumber && !errors.phoneNumber}
                        isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.phoneNumber}
                        </Form.Control.Feedback>
                    </InputGroup>
                    </Form.Group>
                </Row>

                {/* VIP information */}
                <Row className="mb-3">
                    <Form.Group as={Col} md="3" controlId="validationFormik03">
                    <Form.Label>VIP Applied</Form.Label>
                    <Form.Check
                        label="Customer is VIP"
                        name="isVip"
                        checked={values.isVip}
                        onChange={handleChange}
                    />
                    </Form.Group>
                    {values.isVip && (
                    <>
                        <Form.Group as={Col} md="4" controlId="validationFormik04">
                        <Form.Label>VIP Type</Form.Label>
                        <Form.Control
                            as ="select"
                            name="vipType"
                            value={values.vipType}
                            onChange={handleChange}
                            isValid={touched.vipType && !errors.vipType}
                            isInvalid={touched.vipType && !!errors.vipType}
                        >
                            <Select resource={resources.vipType} placeholder = "Select first language..."/>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.vipType}
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationFormik05">
                        <Form.Label>Balance</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="balance"
                            name="balance"
                            value={values.balance}
                            onChange={handleChange}
                            isValid={touched.balance && !errors.balance}
                            isInvalid={touched.balance && !!errors.balance}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.balance}
                        </Form.Control.Feedback>
                        </Form.Group>
                    </>
                    )}
                </Row>

                {/* Other information */}
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationFormik03">
                    <Form.Label>First Language</Form.Label>
                    <Form.Control
                        as = "select"
                        name="firstLanguage"
                        value={values.firstLanguage}
                        onChange={handleChange}
                        isValid={touched.firstLanguage && !errors.firstLanguage}
                        isInvalid={touched.firstLanguage && !!errors.firstLanguage}
                    >   
                        <Select resource={resources.firstLanguage} placeholder = "Select first language..." />
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationFormik04">
                    <Form.Label>Coming Resource</Form.Label>
                    <Form.Control
                        as = "select"
                        placeholder="coming resource"
                        name="comingResource"
                        value={values.comingResource}
                        onChange={handleChange}
                        isValid={touched.comingResource && !errors.comingResource}
                        isInvalid={touched.comingResource && !!errors.comingResource}
                    >
                    <Select resource={resources.comingResource} placeholder = "Select coming resource..."/>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.comingResource}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationFormik05">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type="date"
                        name="birthday"
                        value={values.birthday}
                        onChange={handleChange}
                        isValid={touched.birthday && !errors.birthday}
                        isInvalid={touched.birthday && !!errors.birthday}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.birthday}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                {/* Note */}
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationFormik06">
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="note"
                        name="note"
                        value={values.note}
                        onChange={handleChange}
                        isValid={touched.note && !errors.note}
                        isInvalid={touched.note && !!errors.note}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.note}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Form>
        )}
        </Formik>
    );
});

export default Edit;

import React, { useEffect, forwardRef } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import useService from '../../store/context/ServiceContext';
import { Form, Row, Col } from 'react-bootstrap';
import { Autocomplete, TextField } from '@mui/material';
import useEmployee from '../../store/context/EmployeeContext';
import useCustomer from '../../store/context/CustomerContext';
import Select from '../../components/Select';
import { resources } from '../../store/resources';

const Edit = forwardRef(({}, serviceRef) => {
  const { Formik } = formik;   
  const { service, loading, error, submitService } = useService();
  const { employees, getAllEmployees } = useEmployee();
  const { customers, getAllCustomers } = useCustomer();

  if(customers.length === 0){
    getAllCustomers();
  }
  
  if(employees.length === 0){
    getAllEmployees();
  }

  const schema = yup.object().shape({
    serviceDate: yup.string().required('Service date is required'),
    serviceType: yup.string().required('Service type is required'),
    totalPaid: yup.number().required('Total paid is required'),
    servicePrice: yup.number().required('Service price is required'),
    isTaxed: yup.boolean(),
    tips: yup.number(),
    images: yup.array(),
  });

  const initialValues = service;

  const onFormSubmit = (values) => {
    // submit service from context
    submitService(values);
  };

  const calculateTips = (totalPaid, servicePrice, isTaxed) => {
    if (isTaxed) {
      return totalPaid - servicePrice * 1.05;
    }
    return totalPaid - servicePrice;
  };

  const handleAmountChange = (e, values, setFieldValue) => {
    const { name, type, checked, value } = e.target;

    // If the input is a checkbox, use the `checked` property instead of `value`
    const fieldValue = type === 'checkbox' ? checked : value;
    setFieldValue(name, fieldValue);

    // Calculate tips based on updated values
    const newTips = calculateTips(
      name === 'totalPaid' ? value : values.totalPaid,
      name === 'servicePrice' ? value : values.servicePrice,
      name === 'isTaxed' ? checked : values.isTaxed
    );

    setFieldValue('tips', newTips);
  };

  return (
    <Formik
      innerRef={serviceRef}
      onSubmit={onFormSubmit}
      validationSchema={schema}
      initialValues={initialValues}
    >
      {({
        handleChange,
        values,
        touched,
        errors,
        handleBlur,
        setFieldValue,
      }) => (
        <Form noValidate>
          {/* Basic Information */}
          <Row className='mb-3'>
            <Form.Group as={Col} md='4' controlId='validationFormik01'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type='date'
                name='serviceDate'
                value={values.serviceDate}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.serviceDate && !errors.serviceDate}
                isInvalid={touched.serviceDate && !!errors.serviceDate}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.serviceDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md='4' controlId='validationFormik02'>
              <Form.Label>Customer</Form.Label>
              <Autocomplete
                disablePortal
                id="customer-filter"
                className='customer-filter-autocomplete'
                options={customers}
                getOptionLabel={(option) => option.fullName}
                value={customers.find((customer) => customer.id === values.customerId) || null}
                onChange={(e, value) => setFieldValue('customerId', value?.id || '')}
                renderInput={(params) => <TextField {...params} label='Select Customer' onBlur={handleBlur}/>}
              />
            </Form.Group>

            <Form.Group as={Col} md='4' controlId='validationFormik03'>
              <Form.Label>Service Type</Form.Label>
              <Form.Control
                as ="select"
                name="serviceType"
                value={values.serviceType}
                onChange={handleChange}
                isValid={touched.serviceType && !errors.serviceType}
                isInvalid={touched.serviceType && !!errors.serviceType}
              >
                <Select resource={resources.serviceType} placeholder = "Select service type..."/>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.serviceType}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          {/* Payment Information */}
          <Row className='mb-3'>
            <Form.Group as={Col} md='3' controlId='validationFormik04'>
              <Form.Label>Total Paid</Form.Label>
              <Form.Control
                type='number'
                name='totalPaid'
                value={values.totalPaid}
                onChange={(e) => handleAmountChange(e, values, setFieldValue)}
                onBlur={handleBlur}
                isValid={touched.totalPaid && !errors.totalPaid}
                isInvalid={touched.totalPaid && !!errors.totalPaid}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.totalPaid}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md='3' controlId='validationFormik05'>
              <Form.Label>Service Price</Form.Label>
              <Form.Control
                type='number'
                name='servicePrice'
                value={values.servicePrice}
                onChange={(e) => handleAmountChange(e, values, setFieldValue)}
                onBlur={handleBlur}
                isValid={touched.servicePrice && !errors.servicePrice}
                isInvalid={touched.servicePrice && !!errors.servicePrice}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.servicePrice}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md='3' controlId='validationFormik06'>
              <Form.Label>Taxed Paid</Form.Label>
              <Form.Check
                type='checkbox'
                name='isTaxed'
                label='Taxed'
                checked={values.isTaxed}
                onChange={(e) => handleAmountChange(e, values, setFieldValue)}
                onBlur={handleBlur}
                isInvalid={!!errors.isTaxed}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.isTaxed}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md='3' controlId='validationFormik07'>
              <Form.Label>Tips</Form.Label>
              <Form.Control
                type='number'
                name='tips'
                value={values.tips}
                readOnly
              />
            </Form.Group>
          </Row>

          {/* Employee and Images */}
          <Row className='mb-3'>
            <Form.Group as={Col} md='6' controlId='validationFormik08'>
              <Form.Label>Employees</Form.Label>
              <Autocomplete
                disablePortal
                id="customer-filter"
                className='customer-filter-autocomplete'
                options={employees}
                getOptionLabel={(option) => option.firstName}
                value={employees.find((employee) => employee.id === values.employeeId) || null}
                onChange={(e, value) => setFieldValue('employeeId', value?.id || '')}
                renderInput={(params) => <TextField {...params} label='Select Employee' onBlur={handleBlur}/>}
              />
            </Form.Group>

            <Form.Group as={Col} md='6' controlId='validationFormik09'>
              <Form.Label>Images</Form.Label>
              <Form.Control
                type='file'
                name='images'
                multiple
                onChange={(event) => {
                  const files = Array.from(event.currentTarget.files);
                  setFieldValue('images', files);
                }}
                onBlur={handleBlur}
              />
            </Form.Group>
          </Row>
        </Form>
      )}
    </Formik>
  );
});

export default Edit;

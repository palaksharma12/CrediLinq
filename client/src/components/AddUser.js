import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBInput } from 'mdb-react-ui-kit';
import PhoneInput from 'react-phone-number-input'
import axios from "axios";
import "../css/AddUser.css"

const AddUser = () => {
    const navigate = useNavigate();

    const [formData1, setFormData1] = useState({
        uen: '',
        company: ''
    });
    const [formErrors1, setFormErrors1] = useState({
        uen: '',
        company: ''
    });
    const [formData2, setFormData2] = useState({
        name: '',
        position: '',
        email: '',
        reemail: '',
        mobile: '+65 '
    });
    const [formErrors2, setFormErrors2] = useState({
        name: '',
        position: '',
        email: '',
        reemail: '',
        mobile: ''
    });
    const [isFilled1, setIsFilled1] = useState(false);
    const [isFilled2, setIsFilled2] = useState(false);
    const [isFilled3, setIsFilled3] = useState(false);
    const [checked, setChecked] = useState(false);


    const [file, setFile] = useState(null);

    const handleInputChange1 = (e) => {
        const { name, value } = e.target;
        setFormData1((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear the error message when the user starts typing in a field
        setFormErrors1((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));

        // Check if all fields are filled out
        const errors1 = {};
        if (!formData1.uen) {
            errors1.uen = 'Company UEN is required';
        }
        if (!formData1.name) {
            errors1.name = 'Company Name is required';
        }

        // disabling fields based on errors 
        if (formData1.uen != '' && formData1.name != '') {
            setIsFilled1(true);
        }
        else {
            setIsFilled1(false);
        }
    };
    const handleInputChange2 = (e) => {
        const { name, value } = e.target;
        setFormData2((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear the error message when the user starts typing in a field
        setFormErrors2((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));

        // disabling fields based on errors 
        if (formData2.name != '' && formData2.position != '' && formData2.email != '' && formData2.reemail != '' && formData2.mobile != '') {
            setIsFilled2(true);
        }
        else {
            setIsFilled2(false);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setIsFilled3(true);
    };

    const handleChecked = (e) => {
        setChecked(true);
    }

    const isValidUEN = (uen) => {
        const uenPattern = /^[0-9]{8}[A-Za-z]$/;
        return uenPattern.test(uen);
    };

    const onSubmitForm = async e => {
        e.preventDefault();

        // Check if all fields are filled out
        const errors1 = {};
        const errors2 = {};
        if (!formData1.uen) {
            errors1.uen = 'Company UEN is required';
        }
        if (!formData1.name) {
            errors1.name = 'Company Name is required';
        }
        if (!formData2.name) {
            errors2.name = 'Applicant name is required';
        }
        if (!formData2.position) {
            errors2.position = 'Position within company is required';
        }
        if (!formData2.email) {
            errors2.email = 'Email Address is required';
        }
        if (!formData2.reemail) {
            errors2.reemail = 'Please re-enter email address';
        }
        if (!formData2.mobile) {
            errors2.mobile = 'Mobile Number is required';
        }

        // If there are errors, display custom error messages

        if (Object.keys(errors1).length > 0) {
            setFormErrors1(errors1);
        }
        else if (Object.keys(errors2).length > 0) {
            setFormErrors2(errors2);
        }
        else {
            if (!isValidUEN(formData1.uen)) {
                alert("Company UEN should be 8 digit number followed by a alphabet")
            }
            if (formData2.email != formData2.reemail) {
                alert("Re-entered email does not match")
            }
            try {
                const newFormData = await new FormData();
                newFormData.append('uen', formData1.uen);
                newFormData.append('name', formData1.name);
                newFormData.append('file', file);

                axios.post("http://localhost:5000/adduser", newFormData).then(res => {
                    navigate(`user/${formData1.uen}`);
                }).catch(err => console.log(err))
            }
            catch (err) {
                console.error(err.message);
            }

        }
    }

    return (
        <Fragment >
            <div className=" container adduser">
                <form onSubmit={onSubmitForm}>
                    <div className="form-row section">
                        <div className="section-heading">Company Information</div>
                        <div className="col-md-6 mb-3">
                            <MDBInput
                                className='pt-3 form-control input-field'
                                type='text'
                                value={formData1.uen}
                                label='Company UEN'
                                name="uen"
                                onChange={handleInputChange1} required />
                            <span className="error">{formErrors1.uen}</span>
                        </div>
                        <div className=" col-md-6 mb-3">
                            <MDBInput
                                className='pt-3 form-control input-field'
                                type='text'
                                value={formData1.name}
                                label='Company Name'
                                name="name"
                                onChange={handleInputChange1} required />
                            <span className="error">{formErrors1.name}</span>
                        </div>
                    </div>

                    <div className="form-row section">
                        <div className="section-heading">Applicant Information</div>
                        <div className="col-md-6 mb-3">
                            <MDBInput
                                className='pt-3 form-control input-field applicant'
                                type='text'
                                value={formData2.name}
                                label='Full Name'
                                name="name"
                                disabled={!isFilled1}
                                onChange={handleInputChange2} required />
                            <span className="error">{formErrors2.name}</span>
                        </div>
                        <div className=" col-md-6 mb-3">
                            <MDBInput
                                className='pt-3 form-control input-field applicant'
                                type='text'
                                value={formData2.position}
                                label='Position within company'
                                name="position"
                                disabled={!isFilled1}
                                onChange={handleInputChange2} required />
                            <span className="error">{formErrors2.position}</span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <MDBInput
                                className='pt-3 form-control input-field applicant'
                                type='email'
                                value={formData2.email}
                                label='Email Address'
                                name="email"
                                disabled={!isFilled1}
                                onChange={handleInputChange2} required />
                            <span className="error">{formErrors2.email}</span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <MDBInput
                                className='pt-3 form-control input-field applicant'
                                type='email'
                                value={formData2.reemail}
                                label='Re-enter Email Address'
                                name="reemail"
                                disabled={!isFilled1}
                                onChange={handleInputChange2} required />
                            <span className="error">{formErrors2.reemail}</span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <MDBInput
                                className='pt-3 form-control input-field applicant'
                                type='tel'
                                value={formData2.mobile}
                                label='Mobile Number'
                                name="mobile"
                                disabled={!isFilled1}
                                onChange={handleInputChange2} required />
                            <span className="error">{formErrors2.mobile}</span>
                        </div>
                    </div>
                    <div className="form-row section">
                        <div className="section-heading file">Upload Documents</div>
                        <div className="col-md-6 ">
                            <label for="fileInput" className="btn btn-file justify-content-center" style={{ padding: "10% 0%" }}>Click to upload or drag and drop Bank Statements
                            </label>
                            <input type="file" id="fileInput" style={{ display: "none" }} name="file" disabled={!isFilled2} onChange={handleFileChange} required />
                            {file ? (
                                <p className="d-flex justify-content-center">File uploaded: {file.name}</p>
                            ) : (
                                <p className="d-flex justify-content-center">No file uploaded yet.</p>
                            )}
                        </div>
                        <div className="col-md-6">
                            <ul>
                                <li>PDFs (not scanned copies) of company's operating bank current account(s) statements for the past 6 months.
                                    Example: If today is 07 Nov 23, then please upload bank statements from May 23 to Oct 23 (both months inclusive)</li>
                                <li>If your company is multi-banked, then please upload 6 months bank statements for each bank account</li>
                                <li>If your file is password protected, we request you to remove the password and upload the file to avoid submission failure</li>
                                <li>In case if you are facing any issue while uploading bank statements, Please contact us on support@credilinq.ai</li>
                            </ul>
                        </div>
                    </div>

                    <div className="form-group form-row section">
                        <div className="section-heading">Terms & Conditions</div>

                        <div className="form-check">
                            <input className="form-check-input is-invalid" type="checkbox" value={checked} onClick={handleChecked} disabled={!isFilled3} required />
                            <label className="form-check-label">
                                By ticking, you are confirming that you have understood and are agreeing to the details mentioned:
                            </label>
                            <ul>
                                <li>
                                    I confirm that I am the authorized person to upload bank statements on behalf of my company
                                </li>
                                <li>
                                    I assure you that uploaded bank statements and provided company information match and are of the same company, if there is a mismatch then my report will not be generated</li>
                                <li>
                                    I understand that this is a general report based on the bank statements and Credilinq is not providing a solution or guiding me for my business growth</li>
                                <li>
                                    I have read and understand the
                                    <a href="https://smehealthcheck.credilinq.ai/terms-and-conditions" target="/"> Terms & Conditions</a></li>
                            </ul>

                            <div className="container-fluid justify-content-center">
                                <button className="btn btn-success" disabled={!checked} >Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default AddUser;
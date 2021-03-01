import React, { useState, useRef } from 'react';
import Slider from '../../components/slider/slider'
import Sidebar from '../../components/sidebar/sidebar'

import './contact-view.scss';

const ContactView = () => {

  const [contactData, setContactData] = useState({});

  const nameRef = useRef("");
  const emailRef = useRef("");
  const subjectRef = useRef("");
  const messageRef = useRef("");


  const onFormChange = (e) => {
    setContactData({
      name: nameRef.current.value,
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      message: messageRef.current.value
    });
  }

  const sendForm = (e) => {
    e.preventDefault();
    onFormChange();
  };

  return (
    <>

      <Slider title="Blog" size="small" />

      <div className="content">
        <div className="content__body">
          <h2 className="subheader">Contact</h2>

          <form className="mid-form" onSubmit={sendForm} onChange={onFormChange}>
            <div className="mid-form__form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" ref={nameRef} />
            </div>

            <div className="mid-form__form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" ref={emailRef} />
            </div>

            <div className="mid-form__form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" name="subject" ref={subjectRef} />
            </div>

            <div className="mid-form__form-group">
              <label htmlFor="message">Message</label>
              <textarea name="message" ref={messageRef}></textarea>
            </div>

            <div className="clearfix"></div>

            <input type="submit" value="Send" className="btn btn-success" />
          </form>
        </div>

        <Sidebar blog="false" />
      </div>

    </>
  );
}

export default ContactView;
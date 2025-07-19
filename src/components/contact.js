import React from 'react';
import './Contact.css';

const Contact = () => {
  return (

    // form 
    
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out to us anytime.</p>

        <form className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your Name" required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Your Email" required />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="Write your message here..." rows="5" required></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>

  {/* soial media icon  */}
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="32px"
              height="32px"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
            </svg>
          </a>

          <a href="https://www.twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="32px"
              height="32px"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14.86 5.48 5.48 0 002.4-3.04 10.94 10.94 0 01-3.48 1.33 5.48 5.48 0 00-9.34 5 15.55 15.55 0 01-11.3-5.74 5.48 5.48 0 001.69 7.32A5.46 5.46 0 012 9.71v.07a5.48 5.48 0 004.4 5.37 5.5 5.5 0 01-2.48.1 5.48 5.48 0 005.11 3.81A10.98 10.98 0 012 21.5a15.5 15.5 0 008.39 2.45c10.07 0 15.6-8.34 15.6-15.6 0-.24 0-.48-.02-.71A11.18 11.18 0 0023 3z" />
            </svg>
          </a>

          <a href="https://mail.google.com" target="_blank" rel="noreferrer" aria-label="Google Mail" className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="32px"
              height="32px"
            >
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;

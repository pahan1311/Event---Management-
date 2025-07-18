import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ContactUs.css"; // Import the CSS file for custom styles

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/contacts", formData);
      console.log("Contact added:", response.data);
      setNotification({ message: "Message sent successfully!", type: "success" });
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form fields
    } catch (error) {
      console.error("Error adding contact:", error);
      setNotification({ message: "Error sending message. Please try again.", type: "danger" });
    }
  };

  return (
    <div className="contactus-container">
      {/* Hero Section */}
      <div className="contactus-hero">
        <div className="contactus-hero-content">
          <h1 className="contactus-title">Contact Us</h1>
        </div>
      </div>

      {/* Contact Form and Information Section */}
      <div className="contactus-section">
        <div className="contactus-content">
          {notification.message && (
            <div className={`alert alert-${notification.type}`} role="alert">
              {notification.message}
            </div>
          )}
          <div className="row">
            {/* Contact Form Box */}
            <div className="col-md-6">
              <div className="contactus-box">
                <h2 className="contactus-heading">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>

            {/* Contact Information and Follow Us Box */}
            <div className="col-md-6">
              <div className="contactus-info">
                {/* Contact Details Box */}
                <div className="contactus-details">
                  <h2 className="contactus-heading">Contact Information</h2>
                  <p className="contactus-details-1"><strong>Address:</strong> 123 Event Street, City, Country</p>
                  <p className="contactus-details-1"><strong>Phone:</strong> +123 456 7890</p>
                  <p className="contactus-details-1"><strong>Email:</strong> contact@eventmanagement.com</p>
                </div>

                {/* Follow Us Box */}
                <div className="contactus-follow">
                  <h2 className="contactus-heading">Follow Us</h2>
                  <div>
                    <a href="#" className="btn btn-outline-primary me-2">Facebook</a>
                    <a href="#" className="btn btn-outline-info me-2">Twitter</a>
                    <a href="#" className="btn btn-outline-danger me-2">Instagram</a>
                    <a href="#" className="btn btn-outline-secondary">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

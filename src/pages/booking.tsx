import Image from "next/image";
import { useState } from "react";

export default function Booking() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <>
      <div className="container">
        <div className="photo-wrapper">
          <div className="photo-container">
            <Image
              priority
              src="/images/K-19.jpg"
              alt="Photo 1"
              layout="fill"
              objectFit="cover"
              quality={80}
            />
            <div className="content">
              <h1>HOME/PHOTO 1</h1>
            </div>
          </div>
        </div>
        <div className="formSection">
          <h2 className="section-header">Contact Kaleb</h2>
          <div className="form">
            <div className="name-line">
              <div className="input-label-item">
                <p>First Name</p>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-label-item">
                <p>Last Name</p>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-label-item">
              <p>Email</p>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-label-item">
              <p>Subject</p>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="input-label-item">
              <p>Message</p>
              <textarea
                rows={8}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button className="mainButton" onClick={handleSubmit}>
              SUBMIT
            </button>
          </div>
        </div>
      </div>

      {/*STYLESHEET*/}
      <style jsx>{`
        input,
        textarea {
          width: 100%;
          padding: 0.5rem;
          border: 0.5px solid var(--red);
          margin-top: 0.5rem;
        }
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          margin-bottom: 2rem;
        }
        .photo-wrapper {
          padding: 1rem;
        }
        .photo-container {
          position: relative;
          height: 550px;
          width: 350px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          clip-path: ellipse(69% 100% at 50% 100%);
        }
        .section-header {
          font-size: 32px;
          font-weight: 700;
          color: var(--blues);
          text-align: center;
          line-height: 0.9;
          padding: 2rem;
        }
        .form {
          display: flex;
          flex-direction: column;
        }
        .name-line {
          display: flex;
          flex-direction: row;
        }
        .input-label-item {
          display: flex;
          flex-direction: column;
          padding: 0.5rem 1rem;
        }
        .input-label-item p {
          font-size: 18px;
          color: var(--red);
        }
        .mainButton {
          width: 25%;
          margin: 1rem;
          padding: 0.5rem;
        }
      `}</style>
    </>
  );
}

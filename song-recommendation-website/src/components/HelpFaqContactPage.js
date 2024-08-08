import React from 'react';

const HelpFaqContactPage = () => {
  return (
    <div className="container my-5">
      <h2>Help/FAQ</h2>
      <div>
        <h3>Frequently Asked Questions</h3>
        <ul>
          <li>Question 1: Answer 1</li>
          <li>Question 2: Answer 2</li>
          <li>Question 3: Answer 3</li>
        </ul>
      </div>
      <div>
        <h3>Contact Us</h3>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea className="form-control"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default HelpFaqContactPage;

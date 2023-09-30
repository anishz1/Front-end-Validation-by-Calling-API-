import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [queuePosition, setQueuePosition] = useState(null);

  // UseEffect to fetch the queue position from the API
  useEffect(() => {
    axios
      .get('https://api.apilayer.com/marketplace/mem_db/v1/react-assignment/queue', {
        headers: {
          'Api-Key': '1hPWgDeQjPQTriKYlahWy1F594Hn16tj',
        },
      })
      .then((response) => {
        setQueuePosition(response.data.position);
      })
      .catch((error) => {
        console.error('Error fetching queue position:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value)
    // Validate input fields and change border color
    if (name === 'name') {
      setName(value);
      setIsValidName(value !== '');
    } else if (name === 'email') {
      setEmail(value);
      setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    }
  };

  const handleContactUs = () => {
    // Reset previous success and error messages
    setSuccessMessage('');
    setErrorMessage('');

    // Validate input fields before making the API call
    if (name && isValidEmail) {
      // Make an API call (simulated increase in queue count)
      axios
        .post('https://api.apilayer.com/marketplace/mem_db/v1/react-assignment/increaseQueue', null, {
          headers: {
            'Api-Key': '1hPWgDeQjPQTriKYlahWy1F594Hn16tj',
          },
        })
        .then(() => {
          // Show success message in an alert
          setSuccessMessage('Success! Your message has been sent.');
        })
        .catch((error) => {
          // Show error message below the input fields
          setErrorMessage('Error! Something went wrong. Please try again later.');
          console.error('Error sending message:', error);
        });
    } else {
      // Show error message below the input fields
      setErrorMessage('Error! Please fill out all fields correctly.');
    }
  };

  return (
    <Container className="mt-5">
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={handleInputChange}
            valid={isValidName}
            invalid={!isValidName}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
            valid={isValidEmail}
            invalid={!isValidEmail}
          />
        </FormGroup>
        <Button color="primary" onClick={handleContactUs}>
          Contact Us
        </Button>
        {successMessage && <Alert color="success">{successMessage}</Alert>}
        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        {queuePosition !== null && (
          <p className="mt-3">You are {queuePosition} in the queue.</p>
        )}
      </Form>
    </Container>
  );
};

export default App;

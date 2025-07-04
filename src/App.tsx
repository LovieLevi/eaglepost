import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import 'src/App.scss';

export const App = () => {
    let [success, setSuccess] = React.useState(false);
    let [error, setError] = React.useState(false);
    
    const handleSubmit = async (event: any) => {
	event.preventDefault();
	const data = new FormData(event.target);
	const response = await fetch("http://localhost:8080/api/submit/", {
	    method: "POST",
	    body: data,
        });
	setSuccess(true);
	console.log(response);
    };
    
    return (
	<div className="main-box">
	    <main>
		<h1>OMIS Eagle Post. Propose your story:</h1>
		<Form onSubmit={handleSubmit} method="POST">
		    <Form.Text>
			Please note, your stories will be reviwed, and might not be published. Ask Leo G7A for more information.
		    </Form.Text>
		    <Form.Group className="mb-3">
			<Form.Label>Your name and grade:</Form.Label>
			<Form.Control name="from" placeholder="Eg. 'Chloe G7A'." />
		    </Form.Group>

		    <Form.Group className="mb-3">
			<Form.Label>Category:</Form.Label>
			<Form.Control name="to" placeholder="Eg. 'Sport', 'Science', etc. "/>
		    </Form.Group>

		    <Form.Group className="mb-3">
			<Form.Label>Story text:</Form.Label>
			<InputGroup>
			    <Form.Control as="textarea" name="data" aria-label="With textarea" placeholder="The text you want to be published." />
			</InputGroup>
		    </Form.Group>

		    <Button variant="primary" type="submit">
			Submit
		    </Button>
		</Form>
		{success && <p className="message">Thank you for your submission!</p>}
	    </main>
	</div>
    );
};

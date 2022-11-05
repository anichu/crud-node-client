import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Users = () => {
	const [users, setUsers] = useState({});
	const submitHandler = (event) => {
		event.preventDefault();

		fetch("http://localhost:5000/users", {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(users),
		})
			.then((result) => result.json())
			.then((data) => {
				if (data.acknowledged) {
					alert("user added");
					event.target.reset();
				}
			})
			.catch((err) => console.log(err));
		console.log(users);
	};

	const inputBlurHandler = (event) => {
		const value = event.target.value;
		const field = event.target.name;
		const newUsers = {
			...users,
		};

		newUsers[field] = value;
		setUsers(newUsers);
	};
	return (
		<div>
			<h1 style={{ textAlign: "center" }}>users</h1>
			<Form style={{ width: 400, margin: "auto" }} onSubmit={submitHandler}>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						onBlur={inputBlurHandler}
						name="username"
						placeholder="Username"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						onBlur={inputBlurHandler}
						type="email"
						name="email"
						placeholder="Enter email"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						onBlur={inputBlurHandler}
						name="password"
						placeholder="Password"
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default Users;

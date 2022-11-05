import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";

const Update = () => {
	const loadedUser = useLoaderData();
	const [user, setUser] = useState(loadedUser);
	const navigate = useNavigate();
	console.log(user);
	const submitHandler = (event) => {
		event.preventDefault();
		fetch(`http://localhost:5000/users/${user._id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((result) => result.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					navigate("/");
				}
			})
			.catch((err) => console.log(err));
	};
	const inputChangehandler = (event) => {
		const value = event.target.value;
		const field = event.target.name;
		const newUser = {
			...user,
		};

		newUser[field] = value;
		setUser(newUser);
	};
	return (
		<>
			{" "}
			<h1 style={{ textAlign: "center" }}>{user.username}</h1>
			<Form style={{ width: 400, margin: "auto" }} onSubmit={submitHandler}>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						onChange={inputChangehandler}
						name="username"
						defaultValue={user.username}
						placeholder="Username"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						onChange={inputChangehandler}
						type="email"
						name="email"
						defaultValue={user.email}
						placeholder="Enter email"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						onChange={inputChangehandler}
						defaultValue={user.password}
						name="password"
						placeholder="Password"
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</>
	);
};

export default Update;

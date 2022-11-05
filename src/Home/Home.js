import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
	const users = useLoaderData();
	const [displayUsers, setDisplayUsers] = useState(users);
	console.log(users);
	const deleteUser = (id) => {
		const agree = window.confirm(`Are you sure you want to delete?`);
		if (agree) {
			fetch(`http://localhost:5000/users/${id}`, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.deletedCount > 0) {
						const filteredUsers = displayUsers.filter(
							(user) => user._id !== id
						);
						alert("user deleted!");
						setDisplayUsers(filteredUsers);
					}
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<div style={{ width: 500, margin: "auto" }}>
			<h1 style={{ textAlign: "center" }}>Users {displayUsers.length}</h1>
			{displayUsers.map((user, index) => {
				return (
					<div style={{ textAlign: "center", display: "flex" }} key={index}>
						<h4>{user.email}</h4>
						<button onClick={() => deleteUser(user._id)}>delete</button>
						<Link to={`/users/${user._id}`}>update</Link>
					</div>
				);
			})}
		</div>
	);
};

export default Home;

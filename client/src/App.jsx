import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
	getAuth,
	onAuthStateChanged,
	signInWithRedirect,
	createUserWithEmailAndPassword,
	signOut,
	sendEmailVerification,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import ListOfTodo from "./ListOfTodo";
import axios from "axios";

function App() {
	const [stateAuth, setStateAuth] = useState(
		false || window.localStorage.getItem("auth") === "true"
	);
	const [token, setToken] = useState("");
	const [isVerifying, setIsVerifying] = useState(false);

	const auth = getAuth();

	const loginWithGoogle = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();

		const result = await signInWithRedirect(auth, provider);
	};

	const signOutClick = async () => {
		signOut(auth)
			.then(() => {
				window.localStorage.removeItem("auth");
				setStateAuth(false);
				setIsVerifying(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				setStateAuth(true);
				window.localStorage.setItem("auth", "true");
				const token = await user.getIdToken();

				setToken(token);
			}
		});
	}, []);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerName, setRegisterName] = useState("");
	const [registerAge, setRegisterAge] = useState(0);

	const onRegister = async (e) => {
		e.preventDefault();

		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			);

			axios.post("http://localhost:5000/api/register", {
				email: registerEmail,
				age: registerAge,
				username: registerName,
				name: registerName,
				uid: result.user.uid,
			});
		} catch (error) {
			console.log(JSON.stringify(error));
		}
	};

	const verifyEmail = async () => {
		sendEmailVerification(auth.currentUser);

		setIsVerifying(true);
	};

	const onLogin = async (e) => {
		e.preventDefault();

		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.log(JSON.stringify(error));
		}
	};

	console.log(registerEmail);

	return (
		<div className="App">
			{stateAuth ? (
				<>
					{auth &&
						auth.currentUser &&
						auth.currentUser.emailVerified === false && (
							<div className="verify">
								YOU ARE NOT VERIFIED.
								{isVerifying ? (
									<p>Email Sent!</p>
								) : (
									<button onClick={verifyEmail}>
										Verify now to access all shit
									</button>
								)}
							</div>
						)}
					<button onClick={signOutClick}>Signout</button>
					<ListOfTodo token={token} />
				</>
			) : (
				<>
					<form onSubmit={onLogin}>
						<h1>LOGIn</h1>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.currentTarget.value)}
							placeholder="Email"
						/>
						<br />
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.currentTarget.value)}
							placeholder="Password"
						/>
						<br />
						<button>SUBMIT</button>
					</form>
					<br />
					<br />
					<br />
					<br />
					<br />
					<button onClick={loginWithGoogle}>Login with Google</button>
					<br />
					<br />
					<br />
					<br />
					<br />

					<form onSubmit={onRegister}>
						<h1>Register</h1>
						<input
							type="email"
							value={registerEmail}
							onChange={(e) =>
								setRegisterEmail(e.currentTarget.value)
							}
							placeholder="Email"
						/>
						<br />
						<input
							type="password"
							value={registerPassword}
							onChange={(e) =>
								setRegisterPassword(e.currentTarget.value)
							}
							placeholder="Password"
						/>
						<br />
						<input
							type="text"
							value={registerUsername}
							onChange={(e) =>
								setRegisterUsername(e.currentTarget.value)
							}
							placeholder="Username"
						/>
						<br />
						<input
							type="text"
							value={registerName}
							onChange={(e) =>
								setRegisterName(e.currentTarget.value)
							}
							placeholder="Name"
						/>

						<br />
						<input
							type="number"
							value={registerAge}
							onChange={(e) =>
								setRegisterAge(e.currentTarget.value)
							}
							placeholder="Age"
						/>

						<br />
						<button>SUBMIT</button>
					</form>
				</>
			)}
		</div>
	);
}

export default App;

import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
	getAuth,
	onAuthStateChanged,
	signInWithRedirect,
	signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import ListOfTodo from "./ListOfTodo";

function App() {
	const [stateAuth, setStateAuth] = useState(
		false || window.localStorage.getItem("auth") === "true"
	);
	const [token, setToken] = useState("");

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

	return (
		<div className="App">
			{stateAuth ? (
				<>
					<button onClick={signOutClick}>Signout</button>
					<ListOfTodo token={token} />
				</>
			) : (
				<>
					<button onClick={loginWithGoogle}>Login with Google</button>
				</>
			)}
		</div>
	);
}

export default App;

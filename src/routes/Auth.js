import React, {useState} from "react";
import {authService} from "fbase";


const Auth = () => {
	const [form, setForm] = useState({email: "", password: ""});
	const [newAccount, setNewAccount] = useState(true);
	const onChange = ({target: {name, value}}) => setForm({...form, [name]: value});
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			let data;
			if (newAccount) {
				data = await authService.createUserWithEmailAndPassword(authService.getAuth(), form.email, form.password)
			} else {
				data = await authService.signInWithEmailAndPassword(authService.getAuth(), form.email, form.password);
			}
			console.log(data);
		} catch (error) {
			console.log(error)
		}

	}
	const toggleAccount = () => {
		setNewAccount(!newAccount);
	}
	const onSocialClick = async (event) => {
		const {name} = event.target;
		let provider;
		if (name === "google") {
			provider = new authService.GoogleAuthProvider();

		} else if (name === "github") {
			provider = new authService.GithubAuthProvider();
		}
		await authService.signInWithPopup(authService.getAuth(), provider).then(value => console.log(value))
	}
	return (
		<div>
			<form>
				<input name="email" type="text" placeholder="Email" value={form.email} onChange={onChange} required/>
				<input name="password" type="password" placeholder="password" value={form.password} onChange={onChange}
				       required/>
				<input type="submit" value={newAccount ? "Create Account" : "Log In"} onClick={onSubmit}/>
			</form>
			<span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
			<div>
				<button name="github" onClick={onSocialClick}>Continue with Github</button>
				<button name="google" onClick={onSocialClick}>Continue with Google</button>
			</div>
		</div>
	)
}

export default Auth
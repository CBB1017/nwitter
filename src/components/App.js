import {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(authService.getAuth().currentUser);
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState(null);
	useEffect(() => {
		authService.getAuth().onAuthStateChanged((user) => {
			if(user) {
				setIsLoggedIn(true);
				setUserObj(user);
			}else{
				setIsLoggedIn(false);
			}
			setInit(true);
		})
	}, [])
	console.log(isLoggedIn)
	return (
		<>
			<AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>
			<footer>&copy; Nwitter {new Date().getFullYear()}</footer>
		</>
	);
}

export default App;

import React, {useEffect, useState} from "react";
import {dbService} from "fbase";

const Home = ({userObj}) => {
	const {getFirestore, collection, addDoc, getDocs, onSnapshot, orderBy, query, where} = dbService;
	console.log(userObj)
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);
	const getNweets = async () => {
		const dbNweets = dbService.getDocs(dbService.collection(dbService.getFirestore, "nweets"));
		(await dbNweets).forEach(document => {
			const nweetObject = {
				...document.data(),
				id: document.id
			}
			setNweets(prev => [nweetObject, ...prev])
		})
	}
	useEffect(() => {
		getNweets();
		const q = query(
			collection(getFirestore, 'tweets'),
// where('text', '==', 'hehe') // where뿐만아니라 각종 조건 이 영역에 때려부우면 됨
			orderBy('createdAt')
		);
		const unsubscribe = onSnapshot(q, querySnapshot => {
			const newArray = querySnapshot.docs.map(doc => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
			setTweets(newArray);
			console.log('Current tweets in CA: ', newArray);
		});

		return () => {
			unsubscribe();
		};
	}, [])
	const onChange = (event) => {
		const {value} = event.target;
		setNweet(value);
	}
	const onSubmit = (event) => {
		event.preventDefault();
		try{
			dbService.addDoc(dbService.collection(dbService.getFirestore,"nweets"), {
				text: nweet,
				createdAt: Date.now()
			}).then(() => setNweet(""));
		}catch (e){
			console.log(e);
		}
	}
	return (
		<div>
			<form>
				<input type="text" placeholder="whats on ur mind" onChange={onChange} maxLength={120} value={nweet}/>
				<input type="submit" onClick={onSubmit}/>

			</form>
			<div>
				{nweets.map((nweet) => (
					<div key={nweet.id}>
						<h4>{nweet.text}</h4>
					</div>
				))}
			</div>
		</div>
	)

}

export default Home;
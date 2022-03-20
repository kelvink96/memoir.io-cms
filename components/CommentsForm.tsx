import React, {useEffect, useRef, useState} from 'react';
import {submitComment} from "../services";

interface IProps {
	slug: string
}

const CommentsForm = ({slug}: IProps) => {
	const [error, setError] = useState(false);
	const [localStorage, setLocalStorage] = useState({});
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [name, setName] = useState('');
	const [comment, setComment] = useState('');
	const [email, setEmail] = useState('');
	const [storeData, setStoreData] = useState('');

	useEffect(() => {
		setName(window.localStorage.getItem('name') || '');
		setEmail(window.localStorage.getItem('email') || '');
	}, []);


	const handlePostSubmission = () => {
		setError(false);

		if (!name || !comment || !email) {
			setError(true);
			return;
		}

		const payload = {name, email, comment, slug};

		if (storeData) {
			window.localStorage.setItem('name', name);
			window.localStorage.setItem('email', email);
		} else {
			window.localStorage.removeItem('name');
			window.localStorage.removeItem('email');
		}

		submitComment(payload).then(res => {
			setShowSuccessMessage(true);

			setTimeout(() => {
				setShowSuccessMessage(false);
			}, 3000);
		}).catch(err => {
			setError(true);

			setTimeout(() => {
				setError(false);
			}, 3000);
		})
	}

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">leave a comment</h3>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<textarea
					className="p-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Comment"
					name="comment"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
				<input
					type="text"
					className="py-2 px-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Name"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="email"
					className="py-2 px-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<div>
					<input
						type="checkbox"
						id="storeData"
						name="storeData"
						onChange={(e) => setStoreData(e.target.value)}
					/>
					<label
						htmlFor="storeData"
						className="text-gray-500 cursor-pointer ml-2">save my e-mail and name for the next time I comment</label>
				</div>
			</div>
			{error && <p className="text-xs text-red-500">all fields are required</p>}
			<div className="mt-8">
				<button
					type="button"
					onClick={handlePostSubmission}
					className="transition duration-500 ease-in-out hover:bg-indigo-900 inline-block bg-pink-600 text-lg
					rounded-full text-white px-8 py-3 cursor-pointer">
					post comment
				</button>
				{showSuccessMessage &&
					<span className="text-xl float-right font-semibold mt-3 text-green-500">comment submitted for review</span>}
			</div>
		</div>
	);
};

export default CommentsForm;

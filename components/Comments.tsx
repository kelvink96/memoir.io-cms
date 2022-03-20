import React, {useEffect, useState} from 'react';
import moment from "moment";
import parser from 'html-react-parser';
import {getComments} from "../services";
import {IComment} from "../types";

interface IProps {
	slug: string
}

const Comments = ({slug}: IProps) => {
	const [comments, setComments] = useState<IComment[]>([]);

	useEffect(() => {
		getComments(slug)
			.then(res => setComments(res));
	}, []);


	return (
		<>
			{comments.length > 0 && (
				<div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
					<h3 className="text-xl mb-8 font-semibold border-b pb-4">
						{comments.length}
						{' '}
						comments
					</h3>
					{comments.map(comment => (
						<div key={comment.createdAt} className="border-b border-gray-100 mb-4 pb-4">
							<p className="mb-4">
								<span className="font-semibold">{comment.name}</span>
								{' '}
								on
								{' '}
								{moment(comment.createdAt).format('MMM DD,YYYY')}
							</p>
							<p className="whitespace-pre-line text-gray-600 w-full">{parser(comment.comment)}</p>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default Comments;

import React, {useEffect, useState} from 'react';
import {getRecentPosts, getSimilarPosts} from "../services";
import moment from "moment";
import Link from 'next/link';
import IPost from '../types/IPost';

interface IProps {
	categories?: Array<string>
	slug?: string
}

const PostWidget = ({categories, slug}: IProps) => {
	const [relatedPosts, setRelatedPosts] = useState([]);

	useEffect(() => {
		slug ? getSimilarPosts(categories, slug).then(res => setRelatedPosts(res)) :
			getRecentPosts().then(res => setRelatedPosts(res))
	}, [slug]);

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				{slug ? "Related posts" : "Recent posts"}
			</h3>
			{relatedPosts.map((post: IPost) => (
				<div key={post.title} className="flex items-center w-full mb-4 ">
					<div className="w-16 flex-none">
						<img
							src={post.featuredImage.url}
							alt={post.title}
							height="60px"
							width="60px"
							className="align-middle rounded-full"
						/>
					</div>
					<div className="flex-grow ml-4">
						<p className="text-gray-500 font-xs">
							{moment(post.createdAt).format('MMM DD, YYYY')}
						</p>
						<Link href={`/post/${post.slug}`}>
							{post.title}
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default PostWidget;

import React from 'react';
import moment from "moment";
import {IPost} from "../types";
import {FaCalendarAlt} from "react-icons/fa";

interface IProps {
	post: IPost
}

const PostDetails = ({post}: IProps) => {
	const getContentFragment = (index: React.Key | null | undefined,
	                            text: any,
	                            obj: {
		                            bold: any;
		                            italic: any;
		                            underline: any;
		                            title: string | undefined;
		                            height: string | number | undefined;
		                            width: string | number | undefined;
		                            src: string | undefined;
	                            },
	                            type?: string) => {
		let modifiedText = text;

		if (obj) {
			if (obj.bold) {
				modifiedText = (<b key={index}>{text}</b>);
			}

			if (obj.italic) {
				modifiedText = (<em key={index}>{text}</em>);
			}

			if (obj.underline) {
				modifiedText = (<u key={index}>{text}</u>);
			}
		}

		switch (type) {
			case 'heading-three':
				return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item: any, i: number) => <React.Fragment
					key={i}>{item}</React.Fragment>)}</h3>;
			case 'paragraph':
				return <p key={index} className="mb-8">{modifiedText.map((item: any, i: number) => <React.Fragment
					key={i}>{item}</React.Fragment>)}</p>;
			case 'heading-four':
				return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item: any, i: number) => <React.Fragment
					key={i}>{item}</React.Fragment>)}</h4>;
			case 'image':
				return (
					<img
						key={index}
						alt={obj.title}
						height={obj.height}
						width={obj.width}
						src={obj.src}
					/>
				);
			default:
				return modifiedText;
		}
	};

	return (
		<div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
			<div className="relative overflow-hidden shadow-md mb-6">
				<img
					src={post.featuredImage.url}
					alt={post.title}
					className="object-top h-full w-full rounded-t-lg"
				/>
			</div>
			<div className="px-4 lg:px-0">
				<div className="flex items-center mb-8 w-full">
					<div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
						<img
							src={post.author.photo.url}
							alt={post.author.name}
							height="30px"
							width="30px"
							className="align-middle rounded-full"
						/>
						<p className="inline align-middle text-gray-700 ml-2 text-lg">{post.author.name}</p>
					</div>
					<div className="font-medium text-gray-700 flex align-middle justify-center">
						<span className="mr-2 mt-1"><FaCalendarAlt/></span>
						<span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
					</div>
				</div>
				<h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
				{post.content.raw.children.map((typeObj, index) => {
					const children = typeObj.children.map((item: any, itemIndex: number) => getContentFragment(itemIndex, item.text, item));
					return getContentFragment(index, children, typeObj, typeObj.type);
				})}
			</div>
		</div>
	);
};

export default PostDetails;

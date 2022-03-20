import type {NextPage} from 'next'
import Head from 'next/head'
import {Categories, PostCard, PostWidget} from "../components";
import { FeaturedPosts } from '../sections';
import {getPosts} from "../services";

interface IProps {
	posts: Array<Record<any, any>>
};

const Home: NextPage<IProps> = ({posts}) => {
	return (
		<div className="container mx-auto px-10 mb-8">
			<Head>
				<title>Memoir.io - CMS</title>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<FeaturedPosts/>
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1">
					{posts.map((post, idx) => <PostCard post={post.node} key={`post-${idx}`}/>)}
				</div>
				<div className="lg:col-span-4 col-span-1">
					<div className="lg:sticky relative top-8">
						<PostWidget/>
						<Categories/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home;

export async function getStaticProps() {
	const posts = (await getPosts()) || [];

	return {
		props: {posts}
	}
}

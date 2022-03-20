import {gql, GraphQLClient} from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphqlCMSToken = process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN;

export default async function comments(req: any, res: any) {
	console.log({graphqlCMSToken});
	const graphQLClient = new GraphQLClient(<string>graphqlAPI, {
		headers: {
			authorization: `Bearer ${graphqlCMSToken}`
		}
	});

	const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!){
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) {id}
    }`;

	try {
		const result = await graphQLClient.request(query, req.body);

		console.log(result);
		return res.status(200).send(result);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
}

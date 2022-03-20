import {gql, request} from "graphql-request";
import exp from "constants";

const graphqlAPI = process.env["NEXT_PUBLIC_GRAPHCMS_ENDPOINT"] || "";

export const getPosts = async () => {
	const query = gql`
			query MyQuery {
			  postsConnection {
			    edges {
			      node {
			        author {
			          bio
			          id
			          name
			          photo {
			            url
			          }
			        }
			        createdAt
			        slug
			        title
			        excerpt
			        featuredImage {
				        url
				      }
			      }
			    }
			  }
			}
		`;

	const result = await request(graphqlAPI, query);

	return result.postsConnection.edges;
}

export const getRecentPosts = async () => {
	const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC,
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

	const result = await request(graphqlAPI, query);

	return result.posts;
}

export const getSimilarPosts = async (categories: string[] | undefined, slug: string) => {
	const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories }}},
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

	const result = await request(graphqlAPI, query, {categories, slug});

	return result.posts;
}

export const getCategories = async () => {
	const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

	const result = await request(graphqlAPI, query);

	return result.categories;
}

export const getPostDetails = async (slug: string) => {
	const query = gql`
			query GetPostDetails($slug: String!) {
				post(where: {slug: $slug}) {
				  author {
	          bio
	          id
	          name
	          photo {
	            url
	          }
	        }
	        createdAt
	        slug
	        title
	        excerpt
	        featuredImage {
		        url
		      }
		      content {
		        raw
		      }
	      }
			}
		`;

	const result = await request(graphqlAPI, query, {slug});

	return result.post;
}

export const submitComment = async (payload: any) => {
	const result = await fetch('/api/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload),
	});

	return result.json();
}

export const getComments = async (slug: string) => {
	const query = gql`
    query GetComments($slug: String!) {
      comments(where: {post: {slug: $slug}}){
        name
        createdAt
        comment
      }
    }
  `;

	const result = await request(graphqlAPI, query, {slug});

	return result.comments;
}

export const getCategoryPost = async (slug: string) => {
	const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

	const result = await request(graphqlAPI, query, { slug });

	return result.postsConnection.edges;
};

export const getFeaturedPosts = async () => {
	const query = gql`
    query GetFeaturedPost() {
      posts(where: {featuredPost: true},) {
        author {
          name
          photo {
            url
          }
        }
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

	const result = await request(graphqlAPI, query);

	return result.posts;
}

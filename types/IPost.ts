import ICategory from "./ICategory";
import IAuthor from "./IAuthor";

export default interface IPost {
	author: IAuthor
	createdAt: string
	slug: string
	title: string
	excerpt: string
	featuredImage: {
		url: string
	}
	content: {
		raw: {
			children: Array<any>
		}
	}
	categories: Array<ICategory>
}

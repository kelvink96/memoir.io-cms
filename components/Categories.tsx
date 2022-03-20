import React, {useEffect, useState} from 'react';
import {getCategories} from "../services";
import Link from "next/link";
import {ICategory} from "../types";

const Categories = () => {
	const [categories, setCategories] = useState<ICategory[]>([]);

	useEffect(() => {
		getCategories().then(resp => setCategories(resp));
	}, []);

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">categories</h3>
			{categories.map(category => (
				<Link href={`/category/${category.slug}`} key={category.slug}>
					<span className="cursor-pointer block pb-3 mb-3">{category.name}</span>
				</Link>
			))}
		</div>
	);
};

export default Categories;

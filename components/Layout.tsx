import React, {ReactNode} from 'react';
import Header from './Header';

interface IProps {
	children: ReactNode
}

const Layout = ({children}: IProps) => {
	return (
		<>
			<Header/>
			{children}
		</>
	);
};

export default Layout;

import React from 'react';
import Container from '../Container/Container';
import Header from '../Header/Header';

const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <Container>{ children}</Container>
        </>
    );
};

export default Layout;
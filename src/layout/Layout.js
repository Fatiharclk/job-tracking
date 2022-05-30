import React from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Navigation from '../router/router'

export default function Layout() {
    return (
        <>
            <Header></Header>
            <Navigation></Navigation>
            <Footer></Footer>
        </>
    )
}

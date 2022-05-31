import React from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Navigation from '../router/router'

import "./Layout.scss"

export default function Layout() {
    return (
        <>
            <Header></Header>
            <div className='main-layout'>
                <Navigation></Navigation>
            </div>

            <Footer></Footer>
        </>
    )
}

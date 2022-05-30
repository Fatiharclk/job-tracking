import React from 'react'
import "./Header.scss"
export default function Header() {
    return (
        <nav className="navbar">
            <div className="navbar-container container">
                <ul className="menu-items">
                    <li><a>Home</a></li>
                    <li><a>Table</a></li>
                </ul>
                <h1 className="logo">FA</h1>
            </div>
        </nav>
    )
}

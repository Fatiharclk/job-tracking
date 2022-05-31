import React from 'react'
import { useHistory } from 'react-router-dom'
import "./Header.scss"
export default function Header() {
    let history = useHistory()
    return (
        <nav className="navbar">
            <div className="navbar-container container">
                <ul className="menu-items">
                    <li onClick={() => history.push("/")}><a>Home</a></li>
                    <li onClick={() => history.push("/table")}><a>Table</a></li>
                </ul>
                <h1 className="logo">FA</h1>
            </div>
        </nav>
    )
}

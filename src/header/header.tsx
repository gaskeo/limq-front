import React from 'react'

export function Header() {
    return (
        <header className="app-header">
            <div className='lithium-container'>
                <span className="lithium-label">Lithium</span>
                <span className="lithium-label mq-label">MQ</span>
            </div>
            <a href='/#/login'>Войти</a>
        </header>)
}
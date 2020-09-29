import React from 'react'
import {Link} from 'react-router-dom'

export const LinksList = ({ links }) => {
    if (!links.length) {
        return (
            <div className='empty-list'>
                <h3>Список ссылок пуст</h3>
            </div>
        )

    }
    return (

        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Сокращенная</th>
                <th>Оригинальная</th>
                <th>Подробнее</th>
            </tr>
            </thead>
            <tbody>
            {links.map((link,index) => {
                return (
                    <tr key={link._id}>
                        <th>{index+1}</th>
                        <th>{link.to}</th>
                        <th>{link.from}</th>
                        <th><Link to={`/detail/${link._id}`}> Открыть </Link></th>
                    </tr>
                )
            })}
            </tbody>

        </table>
    )
}
import React from 'react'

export default function Item(props) {
    return (
        <div>
            <h1>Test</h1>
            <h2>{props.match.params.id}</h2>
        </div>
    )
}

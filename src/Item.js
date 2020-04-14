import React from 'react'

export default function Item(props) {
    return (
        <div>
            <h1>Test</h1>
            <h2 onClick={() => console.log(props.match.params.id)}>eeeee</h2>
        </div>
    )
}

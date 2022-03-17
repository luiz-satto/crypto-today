import React from 'react'

import './index.css'

interface IProps {
    type: string,
    content: any
}

const Badge: React.FC<IProps> = props => {
    return (
        <span className={`badge badge-${props.type}`}>
            {props.content}
        </span>
    )
}

export default Badge

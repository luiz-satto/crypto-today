import React, { useState, useEffect } from 'react'

import './index.css'

interface IProps {
    limit?: number,
    headData: string[],
    renderHead: (item: string, index: number) => JSX.Element,
    bodyData: any[],
    renderBody: (item: any, index: number) => JSX.Element,
}

const Table: React.FC<IProps> = props => {
    const initDataShow = props.limit && props.bodyData
        ? props.bodyData.slice(0, Number(props.limit))
        : props.bodyData

    const [dataShow, setDataShow] = useState(initDataShow)
    const [pages, setPages] = useState(1)
    const [range, setRange] = useState<number[]>([])
    const [currPage, setCurrPage] = useState(0)

    useEffect(() => {
        if (props.limit !== undefined) {
            let page = Math.floor(props.bodyData.length / Number(props.limit))
            setPages(props.bodyData.length % Number(props.limit) === 0 ? page : page + 1)
            setRange(Array.from(Array(pages).keys()))
        }
    }, [props, pages])

    const selectPage = (page: number) => {
        const start = Number(props.limit) * page
        const end = start + Number(props.limit)

        setDataShow(props.bodyData.slice(start, end))
        setCurrPage(page)
    }

    return (
        <div>
            <div className="table-wrapper">
                <table>
                    {
                        props.headData && props.renderHead ? (
                            <thead>
                                <tr>
                                    {
                                        props.headData.map((item, index) => props.renderHead(item, index))
                                    }
                                </tr>
                            </thead>
                        ) : null
                    }
                    {
                        props.bodyData && props.renderBody ? (
                            <tbody>
                                {
                                    dataShow.map((item, index) => props.renderBody(item, index))
                                }
                            </tbody>
                        ) : null
                    }
                </table>
            </div>
            {
                pages > 1 ? (
                    <div className="table__pagination">
                        {
                            range.map((item, index) => (
                                <div key={index} className={`table__pagination-item ${currPage === index ? 'active' : ''}`} onClick={() => selectPage(index)}>
                                    {item + 1}
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    )
}

export default Table

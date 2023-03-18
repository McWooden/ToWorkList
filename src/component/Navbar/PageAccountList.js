import { useSelector } from "react-redux"
import { useState, useEffect, useMemo } from "react"
import { PageListItem } from "./PageListItem"

export function PageAccountList() {
    const bookId = useSelector(state => state.fetch.bookId)
    const [pageList, setPageList] = useState([])
    const pages = useMemo(() => [
        {
            details: {
                page_title: 'Summary',
                icon: 'faAddressBook',
            }
        },
        {
            details: {
                page_title: 'Notifications',
                icon: 'faBell',
            }
        },
        {
            details: {
                page_title: 'Mail',
                icon: 'faEnvelope',
            }
        },
        {
            details: {
                page_title: 'News',
                icon: 'faNewspaper',
            }
        }
    ], [])

    useEffect(() => {
        const sessionPage = []
        pages.forEach((item, index) => sessionPage.push(<PageListItem key={index} data={item}/>))
        setPageList(sessionPage)
    }, [pages, bookId])

    return (
        <div className="roomList">
            {pageList}
        </div>
    )
}
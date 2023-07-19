import { useEffect } from "react"
import { url } from "../../../utils/variableGlobal";

export function DisplaySearchKey({dataSearch}) {
    useEffect(() => {
        console.log(dataSearch);
    }, [dataSearch])
    let box = dataSearch?.map((x, i) => (
        <div key={i} className="bg-zinc-900 rounded flex items-center p-2 gap-x-3">
            <div className="grid place-content-center">
                <img className="w-[48px] rounded-full" src={x.avatar || `${url}/${x.avatar_url}`} alt={x.nickname||x.book_title} />
            </div>
            <div>
                <p className="text-sm">{x.nickname || x.book_title}</p>
                <p className="text-xs text-zinc-500">{x.tag || `${x.author_nickname}#${x.author_tag}`}</p>
            </div>
        </div>
    ))
    return (
        <div className="book_card_container d-flex flex-col jc-center">
            {box}
        </div>
    )
}

// export function DisplaySearchKey({searchKey}) {
//     const [globalBook, setGlobalBook] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const [box, setBox] = useState([])
//     const [reload, setReload] = useState(false)
//     const dispatch = useDispatch()
//     const fetchData = useCallback(async () => {
//         setReload(false)
//         setLoading(true)
//         try {
//             const response = await axios.get(`${API}/book`)
//             setGlobalBook(response.data)
//         } catch (err) {
//             setReload(true)
//         }
//         setLoading(false)
//     }, [])
//     useEffect(() => {
//         if (!globalBook) {
//             fetchData()
//         } else {
//             let sessionBook = []
//             globalBook.forEach((data, index) => {
//                 sessionBook.push(<BookCardItem data={data} key={index}/>)
//             })
//             setBox(sessionBook)
//         }
//     },[dispatch, fetchData, globalBook])
//     if (reload) return (
//         <div className="book_card_container d-flex jc-center fw-wrap">
//             <div className="reload_btn-frame d-grid pi-center" onClick={fetchData}>
//                 <FontAwesomeIcon icon={fontawesome.faRotateBack} className='reload_btn'/>
//             </div>
//         </div>
//     )
//     if (loading) return (
//         <div className="book_card_container d-flex jc-center fw-wrap">
//             <div className="book_card of-hidden pointerfd-column d -flex of-hidden p-relativeloading"/>
//             <div className="book_card of-hidden pointerfd-column d -flex of-hidden p-relativeloading"/>
//         </div>
//     )
//     return (
//         <div className="book_card_container d-flex jc-center fw-wrap">
//             {box}
//         </div>
//     )
// }
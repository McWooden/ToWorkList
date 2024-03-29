// import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { url } from "../../../utils/variableGlobal";
import { useNavigate } from "react-router-dom";
import { setSummary } from "../../../redux/summaryStore";
import { setPageType } from "../../../redux/sourceSlice";

export function DisplaySearchKey({dataSearch, closeModalCallback}) {
    let box = []
    box = dataSearch?.map((x,i) => <CardList item={x} key={i} closeModalCallback={closeModalCallback}/>)
    return (
        <div className="book_card_container d-flex flex-col jc-center">
            {box}
        </div>
    )
}

function CardList({item, closeModalCallback}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function toInviteBook() {
        navigate(`/join?invite=${item._id}`)
    }
    function seeUserProfile() {
        dispatch(setPageType('faAddressBook'))
        dispatch(setSummary(item._id))
        closeModalCallback()
    }
    if (item.type === 'book') {
        return (
            <div className="rounded flex items-center p-2 gap-x-3 bg-zinc-800" onClick={toInviteBook}>
                <div className="grid place-content-center">
                    <img className="w-[48px] rounded-full" src={`${url}/${item.avatar_url}`} alt={item.book_title} />
                </div>
                <div>
                    <p className="text-sm">{item.book_title}</p>
                    <p className="text-xs">{`${item.author_nickname}#${item.author_tag}`}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="rounded flex items-center p-2 gap-x-3 bg-zinc-800" onClick={seeUserProfile}>
                <div className="grid place-content-center">
                    <img className="w-[48px] rounded-full" src={item.avatar} alt={item.nickname} referrerPolicy='no-referrer'/>
                </div>
                <div>
                    <p className="text-sm">{item.nickname}</p>
                    <p className="text-xs">{item.tag}</p>
                </div>
            </div>
        )
    }
}

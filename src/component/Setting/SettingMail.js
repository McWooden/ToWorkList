import { useSelector } from "react-redux";
import { Greeting } from "../../utils/greeting";
import DisplayMail from "../Page/email/DisplayMail";
import { url } from "../../utils/variableGlobal";
import { useEffect, useState } from "react";

export default function SettingMail() {
    const guildProfile = useSelector(state => state.source.guildProfile)
    const [thisProfile, setThisProfile] = useState({})
    useEffect(() => {
        setThisProfile({
            nama: guildProfile.book_title,
            avatar: `${url}/${guildProfile.avatar_url}`,
            _id: guildProfile._id
        })
        console.log(guildProfile);
    },[guildProfile])
    return (
        <>
        <Greeting/>
        <DisplayMail thisProfile={thisProfile}/>
        </>
    )
}
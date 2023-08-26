import { useSelector } from "react-redux";
import { Greeting } from "../../utils/greeting";
import DisplayMail from "../Page/email/DisplayMail";
import { url } from "../../utils/variableGlobal";

export default function SettingMail() {
    const guildProfile = useSelector(state => state.source.guildProfile)
    return (
        <>
        <Greeting/>
        <DisplayMail thisProfile={{
            nama: guildProfile.book_title,
            avatar: `${url}/${guildProfile.avatar_url}`,
            _id: guildProfile._id
        }}/>
        </>
    )
}
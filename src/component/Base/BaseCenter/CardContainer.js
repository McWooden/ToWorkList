import { useSelector } from "react-redux"
import { TodoModel } from "../../Model/Todo"


export function CardContainer() {
    const source = useSelector(state => state.source.source)
    let box = []
    const list = source.list
    try {
        list.forEach((data, index) => box.push(<TodoModel key={index} item={data}/>))
    } catch (error) {
        
    }
    return box
}
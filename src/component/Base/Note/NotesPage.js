import { TodoRight } from "../todo/todoRight"
import { Left, Center } from "../BaseComponent"
import { Greeting } from "../../../utils/greeting"

export default function NotesPage() {
    return (
        <>
        <Left>
            <div className="p-2">
                <Greeting/>
            </div>
        </Left>
        <Center>
            <div className="p-2">Uhuy</div>
        </Center>
        <TodoRight/>
        </>
    )
}
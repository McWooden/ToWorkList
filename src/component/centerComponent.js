import { ItemData } from './TodoApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faNoteSticky, faCheck, faPlus, faTrash, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {convertDateToString} from '../utils/convertDateFormat'
import { useContext, useState } from 'react';



export function CardImages() {
    const {item} = useContext(ItemData)
    const box = []
    item.images.forEach((data, index) => {
        box.push(
            <Image key={index} data={data}/>
        )
    })
    return (
        <div className='images-container'>
            <div className='images-list'>
                {box}
            </div>
            <FontAwesomeIcon icon={faPlus} className='add-image'/>
        </div>
    )
}
function Image({data}) {
    const [full, setFull] = useState(false)
    function handleFull() {
        setFull(!full)
    }
    return (
        <div className='card-img'>
            <img alt={data.by} className={`card-img-pic ${full&&'full'}`} src={data.pic} onClick={handleFull}/>
            <div className='card-img-context'>
                <div className='card-img-context-deep'>
                    <div className="card-img-by">{data.by}</div>
                    <p className="card-img-desc">{data.desc}</p>
                </div>
                <div className="card-img-date">{convertDateToString(data.date)}</div>
            </div>
        </div>
    )
}
export function Notes() {
    const {item} = useContext(ItemData)
    const notes = []
    item.notes.forEach((item, index) => {
        notes.push(
                <div className='note' key={index}>
                    <div className='note-head'>
                        <FontAwesomeIcon icon={faNoteSticky} style={{color: item.color}} className='note-color'/>
                        <div className="note-btn">
                            <FontAwesomeIcon icon={faTrash} className='pointer'/>
                            <FontAwesomeIcon icon={faPenToSquare} className='pointer'/>
                        </div>
                    </div>
                    <div className='note-body'>
                        <pre>
                            {item.context}
                        </pre>
                        <span className='note-info'>{`${item.by} ${convertDateToString(item.date)}`}</span>
                    </div>
                </div>
            )
        })
    return(
        <div className='notes-container'>
            {notes}
        </div>
    )
}
export function CenterActionButton() {
    const {item} = useContext(ItemData)
    return (
        <div className='center-action-btn'>
            <div className="action-add">
                <FontAwesomeIcon icon={item ? faNoteSticky : faCheck} className='add-btn pointer'/>
            </div>
        </div>
    )
}
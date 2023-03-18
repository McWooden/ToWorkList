import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CenterActionButton } from './BaseCenter/CenterActionButton';
import { AddTaskModal } from './BaseCenter/AddTaskModal';
import { CardContainer } from './BaseCenter/CardContainer';
export function BaseCenter() {
    const pathPageOfBook = useSelector(state => state.fetch.pathPageOfBook)
    const [modalOpen, setModalOpen] = useState(false)
    function handleModalOpen() {
        setModalOpen(true)
    }
    function handleModalClose() {
        setModalOpen(false)
    }
    return (
        <div className="base-center">
            <div className="center d-flex p-relative fd-column">
                <CardContainer/>
                <AddTaskModal modalOpen={modalOpen} title={pathPageOfBook} handleModalClose={handleModalClose}/>
                <CenterActionButton handleModalOpen={handleModalOpen}/>
            </div>
        </div>
    )
}
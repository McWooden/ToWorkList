import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCheck, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import icon from '../assets/images/toworklist.png'
import headerImg from '../assets/images/header.png'
import workGroup from '../assets/images/group-of-work.png'
import '../styles/pages/Home.css'

export default function Home() {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col h-screen overflow-auto'>
            <header>
                <nav className='bg-burlywood p-3 px-5 w-full flex flex-col sm:flex-row justify-between items-center'>
                    <div className='flex items-center text-primary gap-2'>
                        <img src={icon} alt="icon" className='w-12 drop-shadow-md'/>
                        <p className='font-unbounded font-extrabold text-xl text-shadow'>Toworklist</p>
                    </div>
                    <div className='flex gap-2'>
                        <div className='text-primary px-5 text-shadow shadow flex items-center rounded h-9 pointer' onClick={() => navigate('/auth/login')}>Masuk</div>
                        <div className='bg-info px-5 text-whitesmoke text-shadow shadow flex items-center rounded h-9 pointer' onClick={() => navigate('/auth/register')}>Daftar</div>
                    </div>
                </nav>
            </header>
            <section className='flex flex-col sm:flex-row'>
                <img src={headerImg} alt="Group of work" className='h-72 w-72 drop-shadow' />
                <div className='flex-1 p-5 flex items-center justify-center h-72 flex flex-col text-whitesmoke gap-4'>
                    <p className='font-unbounded font-medium text-3xl'>Dalam Setiap Klik, Tersembunyi Keajaiban!</p>
                    <div className='bg-primary-dark-50 rounded-full py-4 px-10 pointer shadow' onClick={() => navigate('/')}>
                        <p className='text-center'>Buka Toworklist di browser anda</p>
                    </div>
                </div>
            </section>
            <main className='flex flex-col sm:flex-row lg:px-28 px-5 sm:flex-row-reverse items-center'>
                <img src={workGroup} alt="Group of work" className='h-72 w-72 drop-shadow' />
                <div className='flex-1 p-5 flex items-center justify-center h-72 flex flex-col text-whitesmoke gap-4'>
                    <p className=''>Bayangkan meja belajar dimana kamu bisa mencatat ide, menyelesaikan tugas, berbagi momen, mengobrol, dan bekerja sama dengan teman-temanmu</p>
                </div>
            </main>
            <section className='flex lg:px-28 px-5 items-center justify-center gap-2 bg-indianred py-5'>
                <div className='p-5 text-whitesmoke flex items-center flex-col rounded-md gap-2 shadow-md bg-primary-dark-25 w-32'>
                    <FontAwesomeIcon icon={faCheck} className='text-3xl'/>
                    <p className='text-xs'>Daftar</p>
                </div>
                <div className='p-5 text-whitesmoke flex items-center flex-col rounded-md gap-2 shadow-md bg-primary-dark-25 w-32'>
                    <FontAwesomeIcon icon={faStickyNote} className='text-3xl'/>
                    <p className='text-xs'>Catatan</p>
                </div>
                <div className='p-5 text-whitesmoke flex items-center flex-col rounded-md gap-2 shadow-md bg-primary-dark-25 w-32'>
                    <FontAwesomeIcon icon={faCalendar} className='text-3xl'/>
                    <p className='text-xs'>Harian</p>
                </div>
            </section>
            <footer className='bg-primary-dark-50 text-whitesmoke h-fill'>
                
            </footer>
        </div>
    )
}
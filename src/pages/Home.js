import React from 'react'
import { useNavigate } from 'react-router-dom'
import icon from '../assets/images/toworklist.png'
import headerImg from '../assets/images/header.png'
import '../styles/pages/Home.css'

export default function Home() {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col h-screen overflow-auto'>
            <header>
                <nav className='bg-burlywood p-3 px-5 w-full flex flex-col sm:flex-row justify-between items-center'>
                    <div className='flex items-center text-primary gap-2'>
                        <img src={icon} alt="icon" className='w-12 drop-shadow'/>
                        <p className='font-unbounded font-extrabold text-xl text-shadow'>Toworklist</p>
                    </div>
                    <div className='flex gap-2'>
                        <div className='text-primary px-5 text-shadow shadow flex items-center rounded h-9 pointer' onClick={() => navigate('/auth/login')}>Masuk</div>
                        <div className='bg-info px-5 text-whitesmoke text-shadow shadow flex items-center rounded h-9 pointer' onClick={() => navigate('/auth/register')}>Daftar</div>
                    </div>
                </nav>
            </header>
            <section className='flex flex-col sm:flex-row'>
                <img src={headerImg} alt="Group of work" className='h-72 w-72' />
                <div className='flex-1 p-5 flex items-center justify-center h-72 flex flex-col text-whitesmoke gap-4'>
                    <p className='font-unbounded font-medium text-3xl'>Dalam Setiap Klik, Tersembunyi Keajaiban!</p>
                    <div className='bg-primary-dark-50 rounded-full py-4 px-10 pointer shadow' onClick={() => navigate('/')}>
                        <p className='text-center'>Buka Toworklist di browser anda</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
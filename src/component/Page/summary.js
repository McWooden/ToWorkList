import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ModalSecond } from '../Modal/ModalSecond'
import { API } from '../../utils/variableGlobal'
import axios from 'axios'
import { loadingToast, saveToast } from '../../utils/notif'
import { toast } from 'react-toastify'
import { setProfile } from '../../redux/sourceSlice'
import { setLocalAccount } from '../../utils/localstorage'


export default function Summary() {
    const myProfile = useSelector((state) => state.source.profile)
    const [modalProfileEditForm, setModalProfileEditForm] = useState(false)

    const [inputNickname, setInputNickname] = useState('')
    const [inputPanggilan, setInputPanggilan] = useState('')
    const [inputPosisi, setInputPosisi] = useState('')
    const [inputTempat, setInputTempat] = useState('')
    const [inputKota, setInputKota] = useState('')
    const [inputNegara, setInputNegara] = useState('')
    const [inputBio, setInputBio] = useState('')
    const [inputId, setInputId] = useState('')

    const dispatch = useDispatch()
    useEffect(() => {
        setInputNickname(myProfile?.nickname || '')
        setInputPanggilan(myProfile?.panggilan || '')
        setInputPosisi(myProfile?.posisi || '')
        setInputTempat(myProfile?.tempat || '')
        setInputKota(myProfile?.kota || '')
        setInputNegara(myProfile?.negara || '')
        setInputBio(myProfile?.bio || '')
        setInputId(myProfile?._id || '')
    }, [myProfile])

    function handleSubmitProfileForm(e) {
        e.preventDefault()
        const dataToSend = {
            nickname: inputNickname,
            panggilan: inputPanggilan,
            tempat: inputTempat,
            posisi: inputPosisi,
            kota:inputKota,
            negara: inputNegara,
            bio: inputBio,
            _id: inputId
        }
        try {
            const promise = loadingToast('Memperbarui info pengguna')
            axios.put(`${API}/user`, dataToSend)
                .then(res => {
                    console.log(res.data._doc)
                    setLocalAccount(res.data._doc)
                    dispatch(setProfile(res.data._doc))
                    setModalProfileEditForm(false)
                }).catch(err => {
                    saveToast('Gagal memperbarui pengguna')
                }).finally(() => {
                    toast.dismiss(promise)
                })
        } catch (error) {}
    }
    return (
        <>
        <div className="flex flex-3 fd-column of-auto p-4 overflow-auto">
            <div className="min-h-48 bg-zinc-900 p-8 flex items-center gap-4 flex-col sm:flex-row rounded-sm">
                <div>
                    <img src={myProfile.avatar} alt={myProfile.nickname} className="rounded-full" />
                </div>
                <div>
                    <p className="text-xl font-bold">{myProfile.nickname}<sup className='ordinal text-xs font-normal text-zinc-600'>{myProfile?.panggilan || ''}</sup></p>
                    <p className="text-center text-sm sm:text-left">#{myProfile.tag}</p>
                </div>
            </div>
            <div className="h-fit bg-zinc-800 p-6 flex flex-col rounded-sm relative">
                <div onClick={() => setModalProfileEditForm(true)} className='absolute top-3 right-3 border-zinc-600 border-solid border rounded-full min-w-[25px] min-h-[25px] flex justify-center items-center text-sm'><FontAwesomeIcon icon={faPen}/></div>
                <p>{myProfile?.posisi || <span className='text-zinc-600'>Posisi</span>} di {myProfile?.tempat || <span className='text-zinc-600'>Tempat</span>}</p>
                <p className='text-sm'>{myProfile?.kota || <span className='text-zinc-600'>Kota</span>}, {myProfile?.negara || <span className='text-zinc-600'>Wilayah/Negara</span>}</p>
                <p className='text-zinc-600 text-xs'><span className='font-bold'>{myProfile?.pengikut?.length || '0'}</span> pengikut</p>
                <p className='text-sm mt-3'>{myProfile?.bio}</p>
            </div>
            <div className="h-fit bg-zinc-800 p-6 flex flex-col rounded-sm relative mt-2.5">
                <div className='absolute top-3 right-3 border-zinc-600 border-solid border rounded-full min-w-[25px] min-h-[25px] flex justify-center items-center text-sm'><FontAwesomeIcon icon={faPen}/></div>
                <p className='font-bold text-xl'>Skill</p>
            </div>
        </div>
        <ModalSecond open={modalProfileEditForm} close={() => setModalProfileEditForm(false)}>
            <form onSubmit={handleSubmitProfileForm} className="m-auto max-h-[90vh] p-10 max-w-xl h-screen of-auto" id="profileEditForm">
            <label htmlFor="nickname" className="block text-sm font-semibold leading-6 text-stone-100">Nama</label>
            <input onChange={(e) => setInputNickname(e.target.value)}  value={inputNickname} id='nickname' type="text" placeholder='Nama' className='outline-none block w-full rounded-md border-0 px-3.5 py-2 text-zinc-200 shadow-sm ring-1 ring-inset ring-zinc-600 bg-zinc-700 placeholder:text-stone-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
            <label htmlFor="panggilan" className="block mt-2.5 text-sm font-semibold leading-6 text-stone-100">Panggilan</label>
            <select onChange={(e) => setInputPanggilan(e.target.value)} value={inputPanggilan} id="panggilan" name="panggilan" className="outline-none rounded-md border-0 bg-zinc-700 bg-none px-3.5 py-2 text-zinc-200 focus:ring-2 focus:ring-inset ring-1 ring-inset ring-zinc-600 focus:ring-indigo-600 sm:text-sm">
              <option>(*)</option>
              <option>(he/him)</option>
              <option>(she/her)</option>
            </select>
            <div className="grid grid-cols-1 gap-x-8 sm:gap-y-6 sm:grid-cols-2">
                <div>
                    <div className="mt-2.5">
                    <label htmlFor="posisi" className="block text-sm font-semibold leading-6 text-stone-100">Posisi</label>
                    <input
                        onChange={(e) => setInputPosisi(e.target.value)} 
                        value={inputPosisi}
                        type="text"
                        name="posisi"
                        id="posisi"
                        placeholder='Posisi'
                        className="outline-none block w-full rounded-md border-0 px-3.5 py-2 text-zinc-200 shadow-sm ring-1 ring-inset bg-zinc-700 ring-zinc-600 placeholder:text-stone-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <div className="mt-2.5">
                    <label htmlFor="tempat" className="block text-sm font-semibold leading-6 text-stone-100">Tempat</label>
                    <input
                        onChange={(e) => setInputTempat(e.target.value)} 
                        value={inputTempat}
                        type="text"
                        name="tempat"
                        id="tempat"
                        placeholder='Institusi atau lembaga'
                        className="outline-none block w-full rounded-md border-0 px-3.5 py-2 text-zinc-200 shadow-sm ring-1 ring-inset bg-zinc-700 ring-zinc-600 placeholder:text-stone-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 sm:gap-y-6 sm:grid-cols-2">
                <div>
                    <div className="mt-2.5">
                    <label htmlFor="kota" className="block text-sm font-semibold leading-6 text-stone-100">Kota</label>
                    <input
                        onChange={(e) => setInputKota(e.target.value)} 
                        value={inputKota}
                        type="text"
                        name="kota"
                        id="kota"
                        placeholder='Kota'
                        className="outline-none block w-full rounded-md border-0 px-3.5 py-2 text-zinc-200 shadow-sm ring-1 ring-inset bg-zinc-700 ring-zinc-600 placeholder:text-stone-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <div className="mt-2.5">
                    <label htmlFor="negara" className="block text-sm font-semibold leading-6 text-stone-100">Negara</label>
                    <input
                        onChange={(e) => setInputNegara(e.target.value)} 
                        value={inputNegara}
                        type="text"
                        name="negara"
                        id="negara"
                        placeholder='Negara/wilayah'
                        className="outline-none block w-full rounded-md border-0 px-3.5 py-2 text-zinc-200 shadow-sm ring-1 ring-inset bg-zinc-700 ring-zinc-600 placeholder:text-stone-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
            </div>
            <div className="sm:col-span-2">
                <div className="mt-2.5">
                <label htmlFor="bio" className="block text-sm font-semibold leading-6 text-stone-100">Bio</label>
                <textarea onChange={(e) => setInputBio(e.target.value)}  value={inputBio} name="bio" id="bio" rows="4" placeholder='Bio' className="outline-none block w-full rounded-md border-0 px-3.5 py-2 text-zinc-200 bg-zinc-700 shadow-sm ring-1 ring-inset ring-zinc-600 placeholder:text-stone-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
            </div>
            <button type="submit" form="profileEditForm" className="mt-2.5 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Simpan</button>
            </form>
        </ModalSecond>
        </>
    )
}
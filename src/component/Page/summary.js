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
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import remarkGfm from 'remark-gfm'
import emoji from 'remark-emoji'
import { setSummary } from '../../redux/summaryStore'
import { useCallback } from 'react'

export default function Summary() {
    const mySummary = useSelector(state => state.source.profile)
    const otherSummaryUserId = useSelector(state => state.summary.userId)
    const [summaryData, setSummaryData] = useState({})

    const [isMe, setIsMe] = useState(true)

    const [modalProfileEditForm, setModalProfileEditForm] = useState(false)
    const [modalLabelForm, setModalLabelForm] = useState(false)
    const [modalBioForm, setModalBioForm] = useState(false)

    const [inputNickname, setInputNickname] = useState('')
    const [inputPanggilan, setInputPanggilan] = useState('')
    const [inputPosisi, setInputPosisi] = useState('')
    const [inputTempat, setInputTempat] = useState('')
    const [inputKota, setInputKota] = useState('')
    const [inputNegara, setInputNegara] = useState('')
    const [inputBio, setInputBio] = useState('')
    const [inputId, setInputId] = useState('')
    
    const [inputLabel, setInputLabel] = useState('')
    const [listLabel, setListLabel] = useState([])

    const dispatch = useDispatch()
    
    const fetchOtherSummary = useCallback(async () => {
        const { data } = await axios.get(`${API}/user/summary/${otherSummaryUserId}`)
        setSummaryData(data)
        setIsMe(false)
    }, [otherSummaryUserId])

    useEffect(() => {
        if (otherSummaryUserId) {
            fetchOtherSummary()
        } else {
            setSummaryData(mySummary)
        }
    }, [dispatch, fetchOtherSummary, mySummary, otherSummaryUserId])

    useEffect(() => {
        setInputNickname(summaryData?.nickname || '')
        setInputPanggilan(summaryData?.panggilan || '')
        setInputPosisi(summaryData?.posisi || '')
        setInputTempat(summaryData?.tempat || '')
        setInputKota(summaryData?.kota || '')
        setInputNegara(summaryData?.negara || '')
        setInputBio(summaryData?.bio || '')
        setListLabel([...(summaryData?.label ?? [])]);
        setInputId(summaryData?._id || '')
    }, [summaryData])
    useEffect(() => {
        return () => {
            dispatch(setSummary(''))
            setIsMe(true)
        }
    }, [dispatch])

    const removeLabel = (index) => {
        const updatedList = [...listLabel]
        updatedList.splice(index, 1)
        setListLabel(updatedList)
    }    

    function addLabel() {
        if (!inputLabel) return
        setListLabel(prev => [...prev, inputLabel])
        setInputLabel('')
    }

    function handleBioForm(e) {
        e.preventDefault()
        const dataToSend = {
            bio: inputBio,
            _id: inputId
        }
        try {
            const promise = loadingToast('Memperbarui bio pengguna')
            axios.put(`${API}/user/bio`, dataToSend)
                .then(res => {
                    setLocalAccount(res.data._doc)
                    dispatch(setProfile(res.data._doc))
                    setModalBioForm(false)
                }).catch(err => {
                    saveToast('Gagal memperbarui bio pengguna')
                }).finally(() => {
                    toast.dismiss(promise)
                })
        } catch (error) {}
    }
    function handleLabelForm(e) {
        e.preventDefault()
        const dataToSend = {
            label: listLabel,
            _id: inputId
        }
        try {
            const promise = loadingToast('Memperbarui label pengguna')
            axios.put(`${API}/user/label`, dataToSend)
                .then(res => {
                    setLocalAccount(res.data._doc)
                    dispatch(setProfile(res.data._doc))
                    setModalLabelForm(false)
                }).catch(err => {
                    saveToast('Gagal memperbarui label pengguna')
                }).finally(() => {
                    toast.dismiss(promise)
                })
        } catch (error) {}
    }
    function handleSubmitProfileForm(e) {
        e.preventDefault()
        const dataToSend = {
            nickname: inputNickname,
            panggilan: inputPanggilan,
            tempat: inputTempat,
            posisi: inputPosisi,
            kota:inputKota,
            negara: inputNegara,
            _id: inputId
        }
        try {
            const promise = loadingToast('Memperbarui info pengguna')
            axios.put(`${API}/user`, dataToSend)
                .then(res => {
                    setLocalAccount(res.data._doc)
                    dispatch(setProfile(res.data._doc))
                    setModalProfileEditForm(false)
                }).catch(err => {
                    saveToast('Gagal memperbarui info pengguna')
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
                    <img src={summaryData.avatar} alt={summaryData.nickname} className="rounded-full" />
                </div>
                <div>
                    <p className="text-xl font-bold">{summaryData.nickname}<sup className='ordinal text-xs font-normal text-zinc-600'>{summaryData?.panggilan || ''}</sup></p>
                    <p className="text-center text-sm sm:text-left">#{summaryData.tag}</p>
                </div>
            </div>
            <div className="h-fit bg-zinc-800 p-6 flex flex-col rounded-sm flex-col sm:flex-row">
                <div className='flex-2 border-solid border-0 sm:border-r sm:border-b-0 border-b border-zinc-500 pb-1.5 sm:pb-0 relative'>
                    {isMe && <div onClick={() => setModalProfileEditForm(true)} className='absolute top-3 right-3 border-zinc-600 border-solid border rounded-full min-w-[25px] min-h-[25px] flex justify-center items-center text-sm top-2 right-2'><FontAwesomeIcon icon={faPen}/></div>}
                    <p>{summaryData?.posisi || <span className='text-zinc-600'>Posisi</span>} di {summaryData?.tempat || <span className='text-zinc-600'>Tempat</span>}</p>
                    <p className='text-sm'>{summaryData?.kota || <span className='text-zinc-600'>Kota</span>}, {summaryData?.negara || <span className='text-zinc-600'>Wilayah/Negara</span>}</p>
                    <p className='text-zinc-600 text-xs'><span className='font-bold'>{summaryData?.pengikut?.length || '0'}</span> pengikut</p>
                </div>
                <div className='flex-1 pt-1.5 sm:pt-0 sm:pl-1.5 relative'>
                    {isMe && <div className='absolute top-3 right-3 border-zinc-600 border-solid border rounded-full min-w-[25px] min-h-[25px] flex justify-center items-center text-sm top-2 right-2' onClick={() => setModalLabelForm(true)}><FontAwesomeIcon icon={faPen}/></div>}
                    <div className='flex flex-wrap gap-1'>
                        {listLabel?.map((x, i) => (
                            <span
                                key={i}
                                className='border text-white w-fit inline border-solid border-violet-600 py-0.5 px-1 text-xs rounded bg-violet-600 bg-opacity-75'
                            >
                                {x}
                            </span>
                        )) || ''}
                    </div>
                </div>
            </div>
            <div className="mt-2.5 bg-zinc-800 relative whitespace-pre rounded h-fit p-1 max-w-full">
                {isMe && <div className='absolute top-3 right-3 border-zinc-600 border-solid border rounded-full min-w-[25px] min-h-[25px] flex justify-center items-center text-sm top-2 right-2' onClick={() => setModalBioForm(true)}><FontAwesomeIcon icon={faPen}/></div>}
                <div className='overflow-y-auto text-sm'>
                    <ReactMarkdown remarkPlugins={[remarkGfm, emoji]}>{summaryData?.bio}</ReactMarkdown>
                </div>
            </div>
        </div>
        <ModalSecond open={modalProfileEditForm} close={() => setModalProfileEditForm(false)}>
            <form onSubmit={handleSubmitProfileForm} className="m-auto max-h-[90vh] text-xs p-5 sm:p-10 d-flex flex-col max-w-xl h-screen of-auto" id="profileEditForm">
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
                <button type="submit" form="profileEditForm" className="mt-auto block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Simpan</button>
            </form>
        </ModalSecond>
        <ModalSecond open={modalLabelForm} close={() => setModalLabelForm(false)}>
            <form id='labelForm' onSubmit={handleLabelForm} className="m-auto flex flex-col max-h-[90vh] text-xs p-5 sm:p-10 max-w-xl h-screen of-auto">
                <div className='flex flex-col flex-1'>
                    <p className="block text-xl mb-2.5 font-semibold leading-6 text-stone-100">Label</p>
                    <div className="my-2.5 flex flex-wrap gap-1">                    
                    {listLabel?.map((x, i) => (
                        <span
                            key={i}
                            className='border text-white w-fit inline border-solid border-violet-600 py-0.5 px-1 text-xs rounded bg-violet-600 bg-opacity-75'
                            onClick={() => removeLabel(i)}
                        >
                            {x}
                        </span>
                    )) || ''}
                    </div>
                    <div className="mb-2.5 flex mt-auto items-center gap-x-1">
                        <input onChange={(e) => setInputLabel(e.target.value)}  value={inputLabel} name="label" id="label" placeholder='Tambahkan label' className="flex-1 outline-none w-full rounded-md border-0 px-3.5 py-2 text-zinc-200 bg-zinc-700 shadow-sm ring-1 ring-inset ring-zinc-600 placeholder:text-stone-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                        <div onClick={addLabel} className="rounded-md bg-sky-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Tambah</div>
                    </div>
                </div>
                <button type="submit" form="labelForm" className="mt-2.5 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Simpan</button>
            </form>
        </ModalSecond>
        <ModalSecond open={modalBioForm} close={() => setModalBioForm(false)}>
            <form id='bioForm' onSubmit={handleBioForm} className="m-auto flex max-h-[90vh] flex-col text-xs p-5 sm:p-10 max-w-xl h-screen of-auto">
                <div className='flex flex-1'>
                    <div className="my-2.5 flex flex-1 flex-col">
                        <label htmlFor="bio" className="block text-xl mb-2.5 font-semibold leading-6 text-stone-100">Bio</label>
                        <textarea onChange={(e) => setInputBio(e.target.value)}  value={inputBio} name="bio" id="bio" rows="4" placeholder='Bio' className="overflow-y-auto flex-1 h-full whitespace-pre outline-none block w-full rounded-md border-0 px-3.5 py-2 text-zinc-200 bg-zinc-700 shadow-sm ring-1 ring-inset ring-zinc-600 placeholder:text-stone-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                </div>
                <button type="submit" form="bioForm" className="mt-2.5 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Simpan</button>
            </form>
        </ModalSecond>
        </>
    )
}
// import noPic from '../assets/images/noPic.png';
const defaultChat = [{
    nickname: 'McWooden',
    msg: 'wait for next update',
    time: '20.29',
    date: '12/3/2022'
}]
const defaultNotes = [
    {
        context: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere quos nostrum minus esse cum adipisci id, velit provident commodi enim quaerat eaque harum, deserunt sed unde eum impedit fugit autem?. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores suscipit modi reprehenderit incidunt laudantium! Odio, hic. Quidem error sapiente libero excepturi dolores voluptatem nihil doloremque, fugit impedit, ad asperiores molestias repellendus nam eum, perspiciatis possimus.',
        by: 'afrizal',
        date: '12/12/2022',
        color: 'royalblue'
    },
    {
        context: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolor commodi velit a.',
        by: 'afrizal',
        date: '12/20/2022',
        color: 'greenyellow'
    },
    {
        context: 'i have no note',
        by: 'alek',
        date: '12/19/2022',
        color: 'tomato'
    },
    {
        context: 'test',
        by: 'Developer',
        date: '12/22/2022',
        color: 'goldenrod'
    },
]
export const defaultImages = [
    {
        pic: 'https://source.unsplash.com/random/1',
        desc: 'ini gambar centang',
        date: '12/12/2022',
        by: 'anak magang'
    },
    {
        pic: 'https://source.unsplash.com/random/2',
        desc: 'what color is the sky',
        date: '12/12/2022',
        by: 'ai amour'
    },
    {
        pic: 'https://source.unsplash.com/random/3',
        desc: 'asu kayang',
        date: '12/19/2022',
        by: 'alucard'
    }
]
export const defaultItem = {
    id: '7ijnyt6v',
    title: 'Buat aplikasi',
    desc: 'ini webapp toworklist',
    color: 'goldenrod',
    dones: ['McWooden', 'ketua'],
    deadline: '12/19/2022',
    notes: defaultNotes,
    images: defaultImages,
    chat: [
        {
            nickname: 'Developer',
            msg: 'whatsupp its still on going',
            time: '20.25',
            date: '12/3/2022'
        },
        {
            nickname: 'McWooden',
            msg: 'wait for next update',
            time: '20.25',
            date: '12/3/2022'
        },
        {
            nickname: 'Developer',
            msg: 'almost there',
            time: '20.25',
            date: '12/3/2022'
        },
        {
            nickname: 'Developer',
            msg: 'buat alert',
            time: '00.22',
            date: '12/26/2022'
        },
        {
            nickname: 'Developer',
            msg: 'buat setting',
            time: '00.22',
            date: '12/26/2022'
        },
        {
            nickname: 'McWooden',
            msg: 'alert sudah tinggal pake',
            time: '00.12',
            date: '12/28/2022'
        },
        {
            nickname: 'Developer',
            msg: 'buat form image',
            time: '00.24',
            date: '12/28/2022'
        },
    ]
}

export const myAccount = {
    profile: {
        nickname: 'McWooden',
        name: 'Sholahuddin A',
        tag: '2521',
        avatar: 'https://source.unsplash.com/random/mcwooden',
        email: 'example@gmail.com',
        created_at: '12/15/2022',
    },
    rooms: [
        {
            id: '5exirycuv',
            roomName: 'Main todo',
            icon: 'check',
            public: true,
            jadwal: 'https://source.unsplash.com/random/main-todo',
            items: [
                defaultItem,
                {
                    id: '83haox',
                    title: 'parkour sore',
                    desc: 'awokowako jatoh',
                    color: 'tomato',
                    notes: defaultNotes,
                    deadline: '12/12/2022',
                    images: defaultImages,
                    dones: [],
                    chat: [
                        {
                            nickname: 'Developer',
                            msg: 'ngak sakit sih',
                            time: '20.25',
                            date: '12/3/2022'
                        },
                        {
                            nickname: 'McWooden',
                            msg: 'mampus awawokwo',
                            time: '20.29',
                            date: '12/3/2022'
                        },
                        {
                            nickname: 'Developer',
                            msg: '>:(',
                            time: '20.30',
                            date: '12/3/2022'
                        },
                        {
                            nickname: 'woody',
                            msg: 'bisa gini ngak',
                            time: '20.31',
                            date: '12/3/2022'
                        },
                    ]
                },
                {
                    id: 'iwoxksa135',
                    title: 'lari pagi',
                    desc: 'gajadi soalnya pake sepatu',
                    color: 'tomato',
                    notes: defaultNotes,
                    deadline: '12/3/2022',
                    images: defaultImages,
                    dones: [],
                    chat: [
                        {
                            nickname: 'Developer',
                            msg: 'its good for your body :D',
                            time: '20.25',
                            date: '12/3/2022'
                        },
                        {
                            nickname: 'McWooden',
                            msg: 'wait for next update',
                            time: '20.29',
                            date: '12/3/2022'
                        },
                    ]
                },
                {
                    id: 'ofuoabadv',
                    title: 'mandi',
                    desc: 'ntar mandi biar kedinginan',
                    color: 'royalblue',
                    notes: defaultNotes,
                    deadline: '12/27/2022',
                    images: defaultImages,
                    dones: [],
                    chat: [
                        {
                            nickname: 'Developer',
                            msg: 'mandi hanya untuk orang orang bau',
                            time: '20.25',
                            date: '12/3/2022'
                        },
                        {
                            nickname: 'McWooden',
                            msg: 'wait for next update',
                            time: '20.29',
                            date: '12/3/2022'
                        },
                    ]
                },
            ],
        },
        {
            id: '68rcugt7',
            roomName: 'daily task',
            icon: 'check',
            public: true,
            jadwal: 'https://source.unsplash.com/random/daily',
            items: [
                {
                    id: '39f8bBeud',
                    title: 'Sekolah',
                    desc: 'gajadi soalnya besok libur',
                    color: 'royalblue',
                    notes: defaultNotes,
                    deadline: '12/19/2022',
                    images: defaultImages,
                    dones: [],
                    chat: [
                        {
                            nickname: 'Developer',
                            msg: 'libur 2 minggu kan?',
                            time: '20.25',
                            date: '12/3/2022'
                        },
                        {
                            nickname: 'McWooden',
                            msg: 'wait for next update',
                            time: '20.29',
                            date: '12/3/2022'
                        },
                    ]
                },
            ],
        },
    ],
    users: {
        Teman: {
            color: 'aquamarine',
            user: [
                {name: 'Huddin', id: '7364', pic: 'https://source.unsplash.com/random/Huddin', status: 'bangun'},
                {name: 'Rizky', id: '7364', pic: 'https://source.unsplash.com/random/Rizky', status: 'makan'},
                {name: 'bima', id: '7364', pic: 'https://source.unsplash.com/random/bima', status: 'buang air'},
                {name: 'aldo', id: '7364', pic: 'https://source.unsplash.com/random/aldo', status: 'nonton spongebob'},
                {name: 'irfan', id: '7364', pic: 'https://source.unsplash.com/random/irfan', status: 'mabar'},
                {name: 'naufal', id: '7364', pic: 'https://source.unsplash.com/random/naufal', status: 'lose streak'},
                {name: 'hendra', id: '7364', pic: 'https://source.unsplash.com/random/hendra', status: 'tidur'},
            ]
        }
    }
}

export const guildData = [
    {
        profile: {
            guildName: 'Huddin guilds',
            src: 'https://source.unsplash.com/random/huddinguilds',
            by: 'Huddin',
            created_at: '12/15/2022',
        },
        rooms: [
            {
                id: '825435ityfg',
                roomName: 'welcome',
                icon: 'check',
                public: true,
                jadwal: 'https://source.unsplash.com/random/welcome',
                items: [
                    {
                        id: 'txrctv83v8ev8',
                        title: 'welkam buddy',
                        desc: 'disini kita pake stackoverflow :)?',
                        color: 'yellowgreen',
                        dones: [],
                        chat: defaultChat,
                        notes: defaultNotes,
                        images: defaultImages,
                        deadline: '12/19/2022',
                    },
                ],
            },
            {
                id: '8l7ikg',
                roomName: 'peraturan',
                icon: 'check',
                public: true,
                jadwal: 'https://source.unsplash.com/random/peratuan',
                items: [
                    {
                        id: 'e67cti',
                        title: 'fullstack',
                        desc: 'roadmap fullstack?',
                        color: 'maroon',
                        dones: [],
                        chat: defaultChat,
                        notes: defaultNotes,
                        images: defaultImages,
                        deadline: '12/19/2022',
                    },
                ],
            },
            {
                id: '24etrcy',
                roomName: 'tugas',
                icon: 'check',
                public: true,
                jadwal: 'https://source.unsplash.com/random/tugas',
                items: [
                    {
                        id: 'l9ke5jy',
                        title: 'fullstack',
                        desc: 'roadmap fullstack?',
                        color: 'royalblue',
                        dones: [],
                        chat: defaultChat,
                        notes: defaultNotes,
                        images: defaultImages,
                        deadline: '12/19/2022',
                    },
                ],
            },
        ],
        users: {
            admins: {
                color: 'goldenrod',
                user: [
                    {name: 'Huddin', id: '4830', pic: 'https://source.unsplash.com/random/aldo', status: 'mabar'},
                    {name: 'Rizky', id: '4830', pic: 'https://source.unsplash.com/random/Rizky', status: 'mabar'},
                    {name: 'bima', id: '4830', pic: 'https://source.unsplash.com/random/bima', status: 'mabar'},
                ]
            },
            members: {
                color: 'greenyellow',
                user: [
                    {name: 'naufal', id: '4830', pic: 'https://source.unsplash.com/random/naufal', status: 'mabar'},
                    {name: 'irfan', id: '4830', pic: 'https://source.unsplash.com/random/irfan', status: 'mabar'},
                    {name: 'aldo', id: '4830', pic: 'https://source.unsplash.com/random/aldo', status: 'mabar'},
                    {name: 'hendra', id: '4830', pic: 'https://source.unsplash.com/random/hendra', status: 'mabar'},
                ]
            },
        }
    },
    {
        profile: {
            guildName: 'minecraft x-6',
            src: 'https://source.unsplash.com/random/minecraft',
            by: 'afif',
            created_at: '12/15/2022',
        },
        rooms: [
            {
                id: '8otf456fg',
                roomName: 'kampung villager',
                icon: 'check',
                public: true,
                jadwal: 'https://source.unsplash.com/random/kampung',
                items: [
                    {
                        id: '5uryjf',
                        title: 'buat air mancur',
                        desc: 'di tengah pake cobblestone',
                        color: 'goldenrod',
                        dones: [],
                        chat: defaultChat,
                        notes: defaultNotes,
                        images: defaultImages,
                        deadline: '12/19/2022',
                    },
                ],
            },
            {
                id: '3s6d7t',
                roomName: 'meme',
                icon: 'check',
                public: true,
                jadwal: 'https://source.unsplash.com/random/meme',
                items: [
                    {
                        id: '8wusmd',
                        title: 'buat perkampungan',
                        desc: 'nebang pohon terus nguras laut',
                        color: 'royalblue',
                        dones: [],
                        chat: defaultChat,
                        notes: defaultNotes,
                        images: defaultImages,
                        deadline: '12/19/2022',
                    },
                ],
            },
        ],
        users: {
            admins: {
                color: 'goldenrod',
                user: [
                    {name: 'wijdan', id: '3827', pic: 'https://source.unsplash.com/random/wijdan', status: 'mabar'},
                    {name: 'bagas', id: '3827', pic: 'https://source.unsplash.com/random/bagas', status: 'mabar'},
                    {name: 'Huddin', id: '3827', pic: 'https://source.unsplash.com/random/Huddin', status: 'mabar'},
                ]
            },
            members: {
                color: 'greenyellow',
                user: [
                    {name: 'arga', id: '3827', pic: 'https://source.unsplash.com/random/arga', status: 'mabar'},
                    {name: 'levram', id: '3827', pic: 'https://source.unsplash.com/random/levram', status: 'mabar'},
                    {name: 'ceka', id: '3827', pic: 'https://source.unsplash.com/random/ceka', status: 'mabar'},
                    {name: 'farel', id: '3827', pic: 'https://source.unsplash.com/random/farel', status: 'mabar'},
                ]
            },
        }
    }
]
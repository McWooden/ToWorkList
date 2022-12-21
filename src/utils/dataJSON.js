import noPic from '../assets/images/noPic.png';
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
        date: '12/18/2022',
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
        date: '12/18/2022',
        by: 'anak magang'
    },
    {
        pic: 'https://source.unsplash.com/random/2',
        desc: 'what color is the sky',
        date: '12/18/2022',
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
    title: 'Buat aplikasi',
    desc: 'ini webapp toworklist',
    color: 'goldenrod',
    done: ['McWooden'],
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
    ]
}

export const myAccount = {
    profile: {
        nickname: 'McWooden',
        name: 'Sholahuddin A',
        id: '2521',
        pic: noPic,
        email: 'example@gmail.com'
    },
    rooms: [
        {
            roomName: 'Main todo',
            icon: 'check',
            public: true,
            item: [
                defaultItem,
                {
                    title: 'lari pagi',
                    desc: 'gajadi soalnya pake sepatu',
                    color: 'tomato',
                    notes: defaultNotes,
                    deadline: '18/19/2022',
                    images: defaultImages,
                    done: [],
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
                    title: 'mandi',
                    desc: 'ntar mandi biar kedinginan',
                    color: 'royalblue',
                    notes: defaultNotes,
                    deadline: '18/19/2022',
                    images: defaultImages,
                    done: [],
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
            roomName: 'daily task',
            icon: 'check',
            public: true,
            item: [
                {
                    title: 'Sekolah',
                    desc: 'gajadi soalnya besok libur',
                    color: 'royalblue',
                    notes: defaultNotes,
                    deadline: '18/19/2022',
                    images: defaultImages,
                    done: [],
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
        Friends: {
            color: 'aquamarine',
            user: [
                {name: 'Huddin', id: '7364', pic: noPic},
                {name: 'Rizky', id: '7364', pic: noPic},
                {name: 'bima', id: '7364', pic: noPic},
            ]
        },
        Followers: {
            color: 'whitesmoke',
            user: [
                {name: 'aldo', id: '7364', pic: noPic},
                {name: 'irfan', id: '7364', pic: noPic},
                {name: 'naufal', id: '7364', pic: noPic},
                {name: 'hendra', id: '7364', pic: noPic},
            ]
        },
    }
}

export const guildData = [
    {
        profile: {
            guildName: 'Huddin guilds',
            src: noPic,
            by: 'Huddin'
        },
        rooms: [
            {
                roomName: 'welcome',
                icon: 'check',
                public: true,
                item: [
                    {
                        title: 'welkam buddy',
                        desc: 'disini kita pake stackoverflow :)?',
                        color: 'yellowgreen',
                        done: [],
                        chat: defaultChat,
                        notes: defaultNotes,
                        images: defaultImages,
                        deadline: '18/19/2022',
                    },
                ],
            },
            {
                roomName: 'peraturan',
                icon: 'check',
                public: true,
                item: [
                    {
                        title: 'fullstack',
                        desc: 'roadmap fullstack?',
                        color: 'maroon',
                        done: [],
                        chat: defaultChat,
                        notes: defaultNotes,
                        images: defaultImages,
                        deadline: '18/19/2022',
                    },
                ],
            },
            {
                roomName: 'tugas',
                icon: 'check',
                public: true,
                item: [
                    {
                        title: 'fullstack',
                        desc: 'roadmap fullstack?',
                        color: 'royalblue',
                        done: [],
                        chat: defaultChat,
                        notes: defaultNotes,
                        images: defaultImages,
                        deadline: '18/19/2022',
                    },
                ],
            },
        ],
        users: {
            admins: {
                color: 'goldenrod',
                user: [
                    {name: 'Huddin', id: '4830', pic: noPic},
                    {name: 'Rizky', id: '4830', pic: noPic},
                    {name: 'bima', id: '4830', pic: noPic},
                ]
            },
            members: {
                color: 'greenyellow',
                user: [
                    {name: 'naufal', id: '4830', pic: noPic},
                    {name: 'irfan', id: '4830', pic: noPic},
                    {name: 'aldo', id: '4830', pic: noPic},
                    {name: 'hendra', id: '4830', pic: noPic},
                ]
            },
        }

    },
    {
        profile: {
            guildName: 'minecraft x-6',
            src: noPic,
            by: 'afif'
        },
        rooms: [
            {
                roomName: 'kampung villager',
                icon: 'check',
                public: true,
                item: [
                    {
                        title: 'buat air mancur',
                        desc: 'di tengah pake cobblestone',
                        color: 'goldenrod',
                        done: [],
                        chat: defaultChat,
                        notes: defaultNotes,
                        images: defaultImages,
                        deadline: '18/19/2022',
                    },
                ],
            },
            {
                roomName: 'meme',
                icon: 'check',
                public: true,
                item: [
                    {
                        title: 'buat perkampungan',
                        desc: 'nebang pohon terus nguras laut',
                        color: 'royalblue',
                        done: [],
                        chat: defaultChat,
                        notes: defaultNotes,
                        images: defaultImages,
                        deadline: '18/19/2022',
                    },
                ],
            },
        ],
        users: {
            admins: {
                color: 'goldenrod',
                user: [
                    {name: 'wijdan', id: '3827', pic: noPic},
                    {name: 'bagas', id: '3827', pic: noPic},
                    {name: 'Huddin', id: '3827', pic: noPic},
                ]
            },
            members: {
                color: 'greenyellow',
                user: [
                    {name: 'arga', id: '3827', pic: noPic},
                    {name: 'levram', id: '3827', pic: noPic},
                    {name: 'ceka', id: '3827', pic: noPic},
                    {name: 'farel', id: '3827', pic: noPic},
                ]
            },
        }
    }
]
export const chatData = [
    {
        nickname: 'McWooden',
        msg: 'Yo wassap',
        time: '20.00',
        date: '12/2/2022'
    },
    {
        nickname: 'McWooden',
        msg: 'am here',
        time: '20.00',
        date: '12/2/2022'
    },
    {
        nickname: 'Putra',
        msg: 'heyyy',
        time: '20.04',
        date: '12/2/2022'
    },
    {
        nickname: 'Putra',
        msg: 'am here too',
        time: '20.04',
        date: '12/2/2022'
    },
    {
        nickname: 'Putra',
        msg: 'you guys using this app to talk about daily task?',
        time: '20.05',
        date: '12/3/2022'
    },
    {
        nickname: 'Hudin',
        msg: 'Hai',
        time: '20.20',
        date: '12/3/2022'
    },
    {
        nickname: 'Frank',
        msg: 'wow new member Hi!',
        time: '20.23',
        date: '12/3/2022'
    },
    {
        nickname: 'Frank',
        msg: 'welcome! hope you enjoy',
        time: '20.24',
        date: '12/3/2022'
    },
    {
        nickname: 'McWooden',
        msg: 'ini adalah data chat dummy. Huddin akan menyelesaikan frontEnd dan bermain database segera :D',
        time: '20.24',
        date: '12/3/2022'
    },
    {
        nickname: 'McWooden',
        msg: 'dan ini versi ke 3 dari project sebelumnya https://mcwooden.github.io/todo/x6',
        time: '20.24',
        date: '12/3/2022'
    },
]
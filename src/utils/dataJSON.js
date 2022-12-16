import noPic from '../assets/images/noPic.png';

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
                {
                    title: 'Buat aplikasi',
                    desc: 'web aplikasi ini yang akan ku selesaikan',
                    color: 'tomato'
                },
                {
                    title: 'lari pagi',
                    desc: 'gajadi soalnya pake sepatu',
                    color: 'goldenrod'
                },
                {
                    title: 'mandi',
                    desc: 'ntar mandi biar kedinginan',
                    color: 'royalblue'
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
                    color: 'royalblue'
                },
            ],
        },
    ]
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
                        color: 'yellowgreen'
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
                        color: 'maroon'
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
                        color: 'royalblue'
                    },
                ],
            },
        ],
        users: {
            admins: ['Huddin', 'Rizky', 'bima'],
            members: ['aldo', 'irfan', 'nofal', 'hendra']
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
                        color: 'goldenrod'
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
                        color: 'royalblue'
                    },
                ],
            },
        ],
        users: {
            admins: ['wijdan', 'bagas', 'Huddin'],
            members: ['arga', 'levram', 'ceka', 'farel']
        }
    }
]
export const todoData = [
    {
        title: 'Informatika',
        desc: 'Ini kisi-kisi ulangan hehe aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas',
        color: 'tomato'
    },
    {
        title: 'todoV3',
        desc: 'versi ketiga dari project sebelumnya',
        color: 'goldenrod'
    },
    {
        title: 'Camp',
        desc: 'saya gasuka kemah :)',
        color: 'royalblue'
    },
    {
        title: 'ulangan',
        desc: 'masih ulangan sampe rabu',
        color: 'yellowgreen'
    },
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
import fetchNoticias from './fetchNoticias.js'

const noticias = { data: [] }
let prevNoticias = []

export const getNoticias = async (req, res) => {
    try {
        console.log('Get noticias')
        await setNoticias()
        res.status(200).json(noticias)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const setNoticias = async () => {
    if (noticias.data.length == 0) {
        let arr = await fetchNoticias()
        noticias.data = arr
        console.log('noticias.data: ', noticias.data)
    }
}

export const updateNoticias = async (req, res) => {
    console.log('Got /events');
    await setNoticias()
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    });
    res.flushHeaders();

    res.write('retry: 10000\n\n');
    setInterval(async () => {
        if (await cambio()) {
            console.log(noticias)
            res.write(JSON.stringify(noticias))
        }
    }, 5 * 1000)
};

const cambio = async () => {
    // let update = await fetchNoticias()
    let update = [...noticias.data, { title: 'prueba', link: '', new: false }]
    let aux = [...noticias.data]
    if (update !== aux) {
        console.log('distinct')
        noticias.data = update.map((item) => {
            if (aux.includes(item)) {
                return (item)
            } else {
                return ({ ...item, new: true })
            }
        })
        return true
    } else {
        return false
    }
}






import fetchNoticias from './fetchNoticias.js'

let noticias = []
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
    if (noticias.length == 0) {
        noticias = await fetchNoticias()
    }
}

export const updateNoticias = async (req, res) => {
    console.log('Got /events');
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    });
    res.flushHeaders();

    res.write('retry: 10000\n\n');
    setInterval(async () => {
        if (await cambio()) {
            res.write(`data:${noticias}\n\n`)
        }
    }, 5000)
};

const cambio = async () => {
    // let update = await fetchNoticias()
    let update = [...noticias, { title: 'prueba', link: '', new: false }]
    let aux = [...noticias]
    console.log('Aux: ', aux)
    if (update !== aux) {
        console.log('distinct')
        noticias = update.map((item) => {
            if (aux.includes(item)) {
                return item
            } else {
                return { ...item, new: true }
            }
        })
        return true
    } else {
        return false
    }
}



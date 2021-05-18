import fetchNoticias from './fetchNoticias.js'
import ReadWriteLock from 'rwlock'

const noticias = { data: [] }
const lock = new ReadWriteLock()

let update = []
let listening = false

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
            res.write(`data:${JSON.stringify(noticias.data)}\n\n`)
        }
    }, 12 * 60 * 60 * 1000)
};

const cambio = async () => {
    update = await fetchNoticias()
    let aux = [...noticias.data]
    if (update !== aux) {
        noticias.data = update.map((item) => {
            if (aux.includes(item)) {
                return (item)
            } else {
                return ({ ...item, new: true })
            }
        })
        return true
    }
    return false
}







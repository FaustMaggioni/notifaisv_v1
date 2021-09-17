import fetchTrabajos from './fetchTrabajos.js'

let trabajos = { data: [] }

export const getTrabajos = async (req, res) => {
    try {
        console.log('Get trabajos')
        await setTrabajos()
        res.status(200).json(trabajos)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const setTrabajos = async () => {
    if (trabajos.data.length == 0) {
        let arr = await fetchTrabajos()
        trabajos.data = arr
        console.log('trabajos.data: ', trabajos.data)
    }
}

export const updateTrabajos = async (req, res) => {
    console.log('Got /trabajos/update');
    await setTrabajos()
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    });
    res.flushHeaders();

    res.write('retry: 10000\n\n');
    setInterval(async () => {
        if (await cambio()) {
            console.log('sending')
            res.write(`data:${JSON.stringify(trabajos.data)}\n\n`)
        }
    }, 12 * 60 * 60 * 1000)
};

const cambio = async () => {
    update = await fetchTrabajos()
    let aux = [...trabajos.data]
    if (update !== aux) {
        trabajos.data = update.map((item) => {
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


import fetchPasantias from './fetchPasantias.js'

let pasantias = { data: [] }

export const getPasantias = async (req, res) => {
    try {
        console.log('Get pasantias')
        await setPasantias()
        res.status(200).json(pasantias)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const setPasantias = async () => {
    if (pasantias.data.length == 0) {
        let arr = await fetchPasantias()
        pasantias.data = arr
        console.log('trabajos.data: ', pasantias.data)
    }
}

export const updatePasantias = async (req, res) => {
    console.log('Got /pasantias/update');
    await setPasantias()
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
            res.write(`data:${JSON.stringify(pasantias.data)}\n\n`)
        }
    }, 12 * 60 * 60 * 1000)
};

const cambio = async () => {
    update = await fetchPasantias()
    let aux = [...pasantias.data]
    if (update !== aux) {
        pasantias.data = update.map((item) => {
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


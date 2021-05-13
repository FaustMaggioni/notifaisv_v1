import puppeteer from 'puppeteer'
const URL = 'https://faiweb.uncoma.edu.ar'

const fetchNoticias = async () => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage();
    await page.goto(URL)

    let noticias = await page.evaluate(() => {
        const elements = document.querySelectorAll('[class=page-header] h2 a ')
        const noticias = [];
        for (let noticia of elements) {
            let ref = noticia.href;
            let titulo = noticia.innerHTML;
            let palabras = titulo.split('\n', '\t')
            let obj = {
                title: titulo.trim(),
                link: ref,
                new: false
            }
            noticias.push(obj)
        }
        return noticias
    })
    await browser.close()
    return noticias
}

export default fetchNoticias
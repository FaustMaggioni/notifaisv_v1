import puppeteer from 'puppeteer'
const URL = 'https://faiweb.uncoma.edu.ar'

const fetchNoticias = async () => {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage();
    await page.goto(URL)
    let date = new Date()
    console.log(date.getSeconds())
    let noticias = await page.evaluate(() => {
        const elements = document.querySelectorAll('[class=page-header] h2 a ')
        const noticias = [];
        for (let noticia of elements) {
            let ref = noticia.href;
            let titulo = noticia.innerHTML;
            let obj = {
                title: titulo.trim(),
                link: ref,
                new: false
            }
            noticias.push(obj)
        }
        return noticias
    })
    date = new Date()
    console.log(date.getSeconds())
    await browser.close()

    console.log(noticias)
    return noticias
}
fetchNoticias()
export default fetchNoticias
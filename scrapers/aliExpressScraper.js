import puppeteer from "puppeteer";

export default async function getData (source){
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(source,{waitUntil:"load"});
    async function autoScroll(page){
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                var totalHeight = 0;
                var distance = 100;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
    
                    if(totalHeight >= scrollHeight - window.innerHeight){
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }
    await autoScroll(page);
    const grabTitle = await page.evaluate(()=>{
        var objectJson=[];
        var titlearr = [];
        var imgurlarr = [];
        var pricearr = [];
        var counter = 0;
        const title = document.querySelectorAll(".multi--content--11nFIBL");
        const imgURL = document.querySelectorAll(".images--multiImage--25mi-3K .images--hover--1N5tJXp div");
        title.forEach((heading)=>{
            const words = heading.querySelector(".multi--title--G7dOCj3 h3").innerText.split(' ',5);
            var finalWord='';
            for(let i =0;i<5;i++){
                if(i!=0){
                    finalWord = finalWord+" "+words[i];
                }else{
                    finalWord = finalWord+words[i];
                }
            }
            counter++;
            titlearr.push(finalWord);
        })
        imgURL.forEach((url)=>{
            // const source = url.firstElementChild.src;
            // const altersource = source.slice(0,source.length-20);
            imgurlarr.push(url.firstElementChild.src);
        })
        title.forEach((price)=>{
           var priceting = price.querySelector(".multi--price--1okBCly .multi--price-sale--U-S0jtj :nth-child(2)").innerText;
            if(parseInt(priceting)===0){
                priceting = 1;
            }
            pricearr.push(parseInt(priceting)*279.65);
        })
        for(let x = 0;x<counter;x++){
            objectJson.push({"imgurl":imgurlarr[x],"Title":titlearr[x],"Price":pricearr[x],"id":counter});
        }

        return objectJson; 
    });
    return grabTitle;
};
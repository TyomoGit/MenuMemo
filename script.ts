if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(reg => {
        console.log('サービスワーカーを登録しました', reg);
    }).catch(err => {
        console.log('登録失敗', err);
    });
}

class Menu {
    name: string;
    dishes: string[];
    created: Date;

    constructor(name: string = "", dishes: string[] = [], created: Date = new Date()) {
        this.name = name;
        this.dishes = dishes;
        this.created = created;
    }
}



function main() {
    
    const DATA_NAME = "mealData";

    console.log(localStorage.getItem(DATA_NAME));

    localStorage.removeItem("testMeal");

    let anyData = JSON.parse(localStorage.getItem(DATA_NAME) ?? "[]");
    let data: Menu[];
    if( ! Array.isArray(anyData)) {
        localStorage.setItem(DATA_NAME, JSON.stringify(new Array()));
        data = JSON.parse(localStorage.getItem(DATA_NAME) ?? "");
    } else {
        data = anyData;
    }

    console.log("Debug");
    console.log(data);
    let debugData = new Menu("カレーライス", ["カレー", "あああ", "あ", ], new Date());
    data.push(debugData)
    localStorage.setItem(DATA_NAME, JSON.stringify(
        data
    ))

    let section = document.querySelector("div#menuInfo");
    console.log(section);
    
    
    data.forEach(elem => {
        if (section === null) return;
        let dishes = elem.dishes.join(`</li><li>`);
        dishes = `<li>${dishes}</li>`;
        section.innerHTML += `
        <section class="field">
        <h3>${elem.name}</h3>
        <ul>
        ${dishes}
        </ul>
        </section>
        `
    });
}

main();
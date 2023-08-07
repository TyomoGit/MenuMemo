"use strict";
const previousButton = document.getElementById("previousButton");
previousButton === null || previousButton === void 0 ? void 0 : previousButton.addEventListener("click", () => {
    const url = new URL(location.href);
    history.replaceState("", "", url.pathname);
    openLink('index.html');
});
function register() {
    const menuNameField = document.getElementById("menuNameField");
    const mealTypeSelector = document.getElementById("mealTypeSelector");
    const menuContentsField = document.getElementById("menuContentsField");
    const menuMemoField = document.getElementById("menuMemoField");
    let menuName = menuNameField.value;
    let mealType = mealTypeSelector.value;
    const menuContents = menuContentsField.value;
    const menuMemo = menuMemoField.value;
    let date = new Date();
    let data = readData();
    let mealTypeName = "";
    switch (mealType) {
        default:
        case "memo":
            mealTypeName = "メモ";
            break;
        case "morning":
            mealTypeName = "朝食";
            break;
        case "lunch":
            mealTypeName = "昼食";
            break;
        case "dinner":
            mealTypeName = "夕食";
            break;
    }
    if (menuName == "") {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateString = `${year}/${month}/${day}`;
        menuName = `${dateString}の${mealTypeName}`;
    }
    const param = new URLSearchParams(location.search);
    const idInParam = param.get("id");
    const created = idInParam !== null && idInParam !== void 0 ? idInParam : date.toISOString();
    if (idInParam != null) {
        data = data.filter(elem => {
            return elem.created != idInParam;
        });
    }
    data.push(new Menu(menuName, mealType, menuContents === null || menuContents === void 0 ? void 0 : menuContents.split("\n").filter(elem => elem != ""), created, menuMemo));
    writeData(data);
    openLink("index.html");
}
{
    const submitButton = document.getElementById("submitButton");
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", event => {
        register();
    });
}

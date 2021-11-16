
const historyPush = (history, path) => {
    const pathName = window.location.pathname;
    if (path === pathName) {
        // console.log("same path")
        // console.log(path)
        // console.log(pathName)
        return
    } else {
        history.push(path);
    }

};

export default historyPush;

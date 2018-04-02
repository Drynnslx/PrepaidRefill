export default{
    // 本地存储数据
    SetLocalStorage(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    },
    // 本地获取数据
    GetLocalStorage(key){
       return JSON.parse(localStorage.getItem(key))
    }

}
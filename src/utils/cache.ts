// 缓存工具函数

const cache = new Map<string, {data:any,timestamp:number}>()
export const getCache = (key:string)=>{
    const date = Date.now()
    const cached = cache.get(key)
    if(!cached) return null
    const isExpired = date - cached?.timestamp > 5*60*1000
    if(isExpired){
        cache.delete(key)
        return null
    }
    return cached.data
}
export const setCache = (key:string,data:any)=>{
    cache.set(key,{data,timestamp:Date.now()})
}

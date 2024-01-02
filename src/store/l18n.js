import { defineStore } from 'pinia'
export const usel18nStore = defineStore('l18nStore',{
    state:()=>{
        return{
            list:[{
                language:'zh',
                msg:'简体中文'
            },
            {
                language:'en',
                msg:'English'
            },
            {
                language:'jp',
                msg:'日本語'
            },],
            Index:0,
        }
    },
    getters:{},
    actions:{
        
    }
})
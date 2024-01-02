import { defineStore } from 'pinia'

export const useFlowStore = defineStore('flowStore',{
    state:()=>{
        return{
            flow:[],
            flowIndex:0,
            beforOperating:'',
            newOperating:'',
        }
    },
    getters:{},
    actions:{
        addFlow(view){
            if (this.flow.length>=20) {
                this.flow.shift()
                this.flow.push(JSON.stringify(view))
            }else{
                if (this.flow.length === this.flowIndex) {
                    this.flow.push(JSON.stringify(view))
                    this.flowIndex++
                } else {
                    this.flow.splice(0,this.flowIndex)
                    this.flow.push(JSON.stringify(view))
                    this.flowIndex++
                }
            }
            
            
        },
        setBefor(val){
            this.beforOperating = JSON.stringify(val)
        },
        // setNew(val,view){
        //     console.log(view);
        //     this.newOperating = JSON.stringify(val)
        //     if (this.newOperating === this.beforOperating) {
        //         return
        //     }else{
        //         console.log('移动了');
        //         this.flow.push(JSON.stringify(view))
        //         this.flowIndex++
        //     }
        // }
    }
})
import {
    post,get
} from './index'



//作业区情况
export const workArea = p => get("/api/materiel/interactive/two-dimensional/index/operationArea/situation",p);


//作业区受料
export const workAreaShou = p => get("/api/materiel/interactive/two-dimensional/index/operationArea/feedAndReceiving",p);


//作业区检化验
export const workAreaJian = p => post("/api/materiel/interactive/two-dimensional/index/operationArea/analysis",p);


//路径 历史记录
export const routeHistory = p => post("/api/materiel/interactive/two-dimensional/index/route/history",p);


//路径 运输统计
export const route = p => get("/api/materiel/interactive/two-dimensional/index/route/transportStatitics",p);




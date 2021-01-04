import {
    post,get
} from './index'


//主页

//作业区情况
export const workArea = p => post("/api/materiel/interactive/two-dimensional/index/operationArea/situation",p);


//作业区受料
export const workAreaShou = p => get("/api/materiel/interactive/two-dimensional/index/operationArea/feedAndReceiving",p);


//作业区检化验
export const workAreaJian = p => post("/api/materiel/interactive/two-dimensional/index/operationArea/analysis",p);


//路径 历史记录
export const routeHistory = p => post("/api/materiel/interactive/two-dimensional/index/route/history",p);


//路径 运输统计
export const route = p => post("/api/materiel/interactive/two-dimensional/index/route/transportStatitics",p);





//查看所有物料情况
export const workAreaAll = p => get("/api/materiel/interactive/two-dimensional/index/selectAllStorageMateriel",p);

//码头图表-码头进料
export const matou = p => get("/api/materiel/interactive/two-dimensional/index/wharf/feed",p);

//码头检化验
export const matouJian = p => post("/api/materiel/interactive/two-dimensional/index/wharf/analysis",p);

//物料下拉框
export const comboBox = p => get("/api/materiel/interactive/two-dimensional/index/materiel/comboBox",p);

//取样地点下拉框
export const samplingPlace= p => get("/api/materiel/interactive/two-dimensional/index/samplingPlace/comboBox",p);






//二级
//料条物料比例
export const  stripProportion = p => get("/api/materiel/interactive/two-dimensional/second/stripProportion",p); 

//皮带和仓库状态
export const  facilityStatus = p => get("/api/materiel/interactive/two-dimensional/second/facilityStatus",p); 


//皮带计量
export const beltMetering = p => get("/api/materiel/interactive/two-dimensional/second/beltMeteringButton",p); 

//作业区情况-流程详情
export const processDetails = p => get("/api/materiel/interactive/two-dimensional/second/processDetails",p);

//检化验按钮
//export 
export const analysisButton = p => post("/api/materiel/interactive/two-dimensional/second/analysisButton",p);



//库存信息
export const pileInformation = p => get("/api/materiel/interactive/two-dimensional/second/pileInformation",p);

//库存每一层的详情
export const pileInfopileDetailrmation = p => post("/api/materiel/interactive/two-dimensional/second/pileInfopileDetailrmation",p);



//二级 供料受料
export const feedAndReceiving = p => get("/api/materiel/interactive/two-dimensional/second/feedAndReceiving",p);  


//二级 原料库存
export const  storageMaterielStock = p => get("/api/materiel/interactive/two-dimensional/second/storageMaterielStock",p);

//二级 检化验
export const secondAnalysis = p => get("/api/materiel/interactive/two-dimensional/second/analysis",p);  


// 二级 产品数据库
export const storageProduct = p => post("/api/materiel/interactive/two-dimensional/second/storageProduct",p);




//工作台调整
//工作台添加或修改
export const addOrUpdate = p => post("/api/material/graph/addOrUpdate",p);


//工作台列表添加
export const workArtList = p => get("/api/material/graph/list",p);


//查看工序图详情
export const workArtdetail = p => get("/api/material/graph/detail",p);


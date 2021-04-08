const axios = require('axios')
class Index {
    static async index(ctx,next){
        const {format,keyword,page,pagesize,showtype} =ctx.request.query;
        const {data} = await  axios.get('http://mobilecdn.kugou.com/api/v3/search/song',{params:{
            format:format,
            keyword:keyword,
            page:page,
            pagesize:pagesize,
            showtype:showtype
        }})
        console.log(data)
        ctx.body=data
    }
}
module.exports = Index
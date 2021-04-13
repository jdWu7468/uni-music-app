import { Input,Descriptions,Table, Tag, Space,Pagination,Tabs,Button,notification } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import React from 'react';
import axios from 'axios'
import './index.css'

const { Search } = Input;
const { TabPane } = Tabs;

function showTotal(total) {
  return `Total ${total} items`;
}
class discoverMusic extends React.Component{
    constructor() {
        super();
        this.state = {
          inputValue: "你好",
          pageCurrent:1,
          pagesize:10,
          total:0,
          data:[],
          columns : [
            {
              title: '歌曲名称',
              dataIndex: 'filename',
              key: 'filename',
              width: 400,
              render: text => <a>{text}</a>,
            },
            {
              title: '专辑',
              dataIndex: 'album_name',
              key: 'album_name',
              width: 200,
            },
            {
              title: '歌手',
              dataIndex: 'singername',
              key: 'singername',
            },
            {
                title: '歌曲来源',
                dataIndex: 'source',
                key: 'source',
            },
            {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <Space size="middle">
                  <a onClick={()=>this.listen(text,record)} >Listen</a>
                </Space>
              ),
            },
          ],
          url:'',
          lrc:''
        };
    }
    onSearch(){
        var params={
            format:'json',
            keyword:this.state.inputValue,
            page:this.state.pageCurrent,
            pagesize:this.state.pagesize,
            showtype:1
        }
        this.$axios.get('/kugouAPI/api/v3/search/song',{params:params}).then(res=>{
            res.data.data.info.forEach(song => {
                song.source='酷狗音乐';
            });
            this.setState({
                data:res.data.data.info,
                total:res.data.data.total
            })
        })
    }
    setInputValue(event){
      this.setState({
        inputValue:event.target.value
      })
    }
    query(pageNum,pagesize){
      var params={
        format:'json',
        keyword:this.state.inputValue,
        page:pageNum,
        pagesize:pagesize,
        showtype:1
      }
      this.$axios.get('/kugouAPI/api/v3/search/song',{params:params}).then(res=>{
          for (let i = 0; i < res.data.data.info.length; i++) {
            res.data.data.info[i].source='酷狗音乐';
            res.data.data.info[i].key=i;
          }
          this.setState({
              data:res.data.data.info,
              total:res.data.data.total
          })
      })
    }
    callback(key) {
      console.log(key);
    }
    listen(text,record){
      var params={
        hash:record.hash,
        cmd:'playInfo'
      }
      this.$axios.get('/kugouAPI2/app/i/getSongInfo.php',{params:params}).then(res=>{
        if(res.data.url!=''&&res.data.error==''){
          var params1={
            cmd:100,
            hash:record.hash,
            timelength:res.data.timeLength
          }
          this.$axios.get('/kugouAPI3/app/i/krc.php',{params:params1}).then(res1=>{
            var LRCArray = res1.data.split("\n");
            var displayArray=[]
            LRCArray.forEach(item=>{
              let time= item.substring(item.indexOf("[") + 1, item.indexOf("]"));
              displayArray.push({
                time: (time.split(":")[0] * 60 + parseFloat(time.split(":")[1])).toFixed(3),//时间格式[00:00.01]修改为秒数用于之后歌词的位移
                lyric: item.substring(item.indexOf("]") + 1, item.length)
              })
            })
            var node=document.getElementById("lrcArea");
            //var label=document.createElement("LI");
            var html='';
            for(let i=0;i<displayArray.length;i++){
              if(displayArray[i].time!="NaN"){
                html+=displayArray[i].lyric+'<br/>';
              }
            }
            node.innerHTML=html
            this.setState({
              url:res.data.url,
              lrc:res1.data
            })
          })
        }else{
          this.setState({
            url:"",
            lrc:""
          })
          notification.open({
            message: '┗|｀O′|┛ 嗷~~',
            duration:3,
            description:
              "这首歌"+res.data.error+'，建议你换下一曲或换个平台试试',
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        }
      })
    }
    componentDidMount() {
      const audio = document.getElementById('audio');
      audio.addEventListener("timeupdate", ()=>{
        console.log(audio.currentTime.toFixed(3))
      });
    }
    myFunction(event){
      console.log(event.currentTime.toFixed(3))
    }
    render() {
        return(
        <div style={{height:"auto"}}>
            <div className="searchInputDiv">
                <Search
                    placeholder="你想搜索啥音乐啊，靓仔"
                    className="inputWidth"
                    enterButton="查询"
                    allowClear
                    size="large"
                    prefix={<MehOutlined />}
                    onChange ={event => this.setInputValue(event)}
                    onSearch={()=>this.onSearch()}/>
            </div>
            <div className="main">
              <div className="searchResult">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                  <TabPane tab="酷狗" key="1">
                    <Table columns={this.state.columns} dataSource={this.state.data} pagination={false} size="small" scroll={{y:'390px' }}/>
                    <div className="pagination">
                      <Pagination
                        size="small"
                        total={this.state.total}
                        showTotal={showTotal}
                        showSizeChanger
                        showQuickJumper
                        onChange={this.query.bind(this)}
                        />
                    </div>
                  </TabPane>
                  <TabPane tab="网易云" key="2">
                    老网易云了
                  </TabPane>
                </Tabs>
              </div>
                {/* <Descriptions title={this.state.result.filename}>
                    <Descriptions.Item label="歌手">{this.state.result.singername}</Descriptions.Item>
                    <Descriptions.Item label="专辑">{this.state.result.album_name}</Descriptions.Item>
                    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    <Descriptions.Item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                </Descriptions> */}
              <div className="audioAndLRC">
                <div className="lrcArea">
                  <ul id="lrcArea">

                  </ul>
                </div>
                <audio src={this.state.url} controls="controls" className="audio" id="audio">
                  Your browser does not support the audio element.
                </audio>
              </div>
              <div style={{clear:"both"}}></div>
            </div>
        </div>
        )
    }
}


export default discoverMusic
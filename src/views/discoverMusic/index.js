import { Input,Descriptions,Table, Tag, Space,Pagination,Tabs } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import React from 'react';
import axios from 'axios'
import './index.css'

const { Search } = Input;
const { TabPane } = Tabs;
const columns = [
    {
      title: '歌曲名称',
      dataIndex: 'filename',
      key: 'filename',
      render: text => <a>{text}</a>,
    },
    {
      title: '专辑',
      dataIndex: 'album_name',
      key: 'album_name',
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
          <a>Listen</a>
        </Space>
      ),
    },
  ];
  function showTotal(total) {
    return `Total ${total} items`;
  }
class discoverMusic extends React.Component{
    constructor() {
        super();
        this.state = {
          inputValue: "",
          pageCurrent:1,
          pagesize:10,
          total:0,
          data:[]
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
        this.$axios.get('v3/search/song',{params:params}).then(res=>{
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
      this.$axios.get('v3/search/song',{params:params}).then(res=>{
          res.data.data.info.forEach(song => {
              song.source='酷狗音乐';
          });
          this.setState({
              data:res.data.data.info,
              total:res.data.data.total
          })
      })
    }
    callback(key) {
      console.log(key);
    }
    render() {
        return(
        <div>
            <div className="searchInputDiv">
                <Search
                    placeholder="你想搜索啥音乐啊，靓仔"
                    className="inputWidth"
                    enterButton="查询"
                    allowClear
                    size="large"
                    prefix={<MehOutlined />}
                    onChange ={event => this.setInputValue(event)}
                    onSearch={this.onSearch.bind(this,[])}/>
            </div>
            <div className="searchResult">
              <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="酷狗" key="1">
                  <Table columns={columns} dataSource={this.state.data} pagination={false}/>
                  <Pagination
                      size="small"
                      total={this.state.total}
                      showTotal={showTotal}
                      showSizeChanger
                      showQuickJumper
                      onChange={this.query.bind(this)}
                      className="pagination"
                      />
                </TabPane>
                <TabPane tab="网易云" key="2">
                  老网易云了
                </TabPane>
              </Tabs>
                {/* <Descriptions title={this.state.result.filename}>
                    <Descriptions.Item label="歌手">{this.state.result.singername}</Descriptions.Item>
                    <Descriptions.Item label="专辑">{this.state.result.album_name}</Descriptions.Item>
                    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    <Descriptions.Item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                </Descriptions> */}
                
            </div>
        </div>
        )
    }
}


export default discoverMusic
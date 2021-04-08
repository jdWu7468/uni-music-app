import { Input,Descriptions } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import React from 'react';
import axios from 'axios'
import './index.css'

const { Search } = Input;
class discoverMusic extends React.Component{
    constructor() {
        super();
        this.state = {
          inpValue: "",
          result:{}
        };
    }
    onSearch=(value) => {
        var params={
            format:'json',
            keyword:value,
            page:1,
            pagesize:20,
            showtype:1
        }
        this.$axios.get('v3/search/song',{params:params}).then(res=>{
            console.log(res.data.data.info[0]);
            this.setState({
                result:res.data.data.info[0]
            })
        })
    }
    render() {
        return(
        <div>
            <div className="searchInputDiv">
                <Search
                    placeholder="请输入音乐名称"
                    className="inputWidth"
                    enterButton="查询"
                    size="large"
                    prefix={<MehOutlined />}
                    onSearch={this.onSearch}/>
            </div>
            <div className="searchResult">
                <Descriptions title={this.state.result.filename}>
                    <Descriptions.Item label="歌手">{this.state.result.singername}</Descriptions.Item>
                    <Descriptions.Item label="专辑">{this.state.result.album_name}</Descriptions.Item>
                    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    <Descriptions.Item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </div>
        )
    }
}


export default discoverMusic
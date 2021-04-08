import './App.css';
import {HashRouter, Route, Switch,useHistory} from 'react-router-dom';
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb,Input } from 'antd';
import { MehOutlined } from '@ant-design/icons';

import myMusic from './views/myMusic';
import discoverMusic from './views/discoverMusic'
import PropTypes from 'prop-types';
const { Search } = Input;
const { Header, Content, Footer } = Layout;
class App extends Component  {
  static contextTypes = {
      router: PropTypes.object.isRequired,
  }
  constructor(props,context) {
      super(...arguments);
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
        //this.context.router.push({ pathname : '#/discoverMusic' , state : { sonDetail : res }})
        //this.context.router.history.push('#/discoverMusic')
      })
  }
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">聚合音乐</div>
          <Menu theme="dark" mode="horizontal" className="menu">
            <Menu.Item key="1"><a href='#/discoverMusic'>发现音乐</a></Menu.Item>
            <Menu.Item key="2"><a href='#/myMusic'>我的音乐</a></Menu.Item>
            <Menu.Item key="3"><a href='#/firstView'>样式选择</a></Menu.Item>
          </Menu>
          <Search
            placeholder="请输入音乐名称"
            className="searchInput"
            enterButton="查询"
            size="large"
            prefix={<MehOutlined />}
            onSearch={this.onSearch.bind(this)}/>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>Music</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
          <HashRouter>
            <Switch>
                <Route exact path="/myMusic" component={myMusic}/>
                <Route exact path="/discoverMusic" component={discoverMusic}/>
            </Switch>
          </HashRouter>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Uni-Music App ©2020 Created by JDWu</Footer>
      </Layout>
    );
  }
}
export default App;

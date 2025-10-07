import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const { Content } = Layout;

const DashboardLayout = () => {

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      <div className="desktop-sidebar">
        <Sidebar />
      </div>


      <Layout>
        <Navbar />
        <Content style={{
          background: '#f4f5f7', 
          minHeight: 'calc(100vh - 48px)',
          borderLeft: '1px solid #f0f0f0'
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
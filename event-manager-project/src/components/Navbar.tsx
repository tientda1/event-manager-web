import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header style={{ 
      padding: '0 16px', 
      background: '#ffffff', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'flex-start',
      boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      height: '64px',
      minHeight: '64px',
      borderBottom: '1px solid #f0f0f0'
    }}>
    </Header>
  );
};

export default Navbar;

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
      height: '48px',
      minHeight: '48px'
    }}>
    </Header>
  );
};

export default Navbar;

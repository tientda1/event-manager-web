import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { 
  AppstoreOutlined, 
  StarOutlined, 
  CheckSquareOutlined,
  SettingOutlined,
  LogoutOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import trelloLogo from '../assets/images/trello-logo-full.png.png';
import boardImg1 from '../assets/images/board-img-1.jpg';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Mock data cho boards
  const boards = [
    { id: 101, title: '123123213', image: boardImg1 },
    { id: 102, title: '42314', image: boardImg1 },
    { id: 103, title: 'My Trello board', image: boardImg1 },
    { id: 104, title: 'Tổ chức sự kiện Year-end party!', image: boardImg1 }
  ];


  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout');
    navigate('/login');
  };

  const handleCreateBoard = () => {
    console.log('Create new board');
    // TODO: Implement create board logic
  };

  const handleBoardClick = (boardId: number) => {
    console.log('Navigate to board:', boardId);
    navigate(`/dashboard/boards/${boardId}`);
  };

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const menuItems = [
    {
      key: '/dashboard/boards',
      icon: <AppstoreOutlined />,
      label: 'Boards',
    },
    {
      key: '/dashboard/starred',
      icon: <StarOutlined />,
      label: 'Starred Boards',
    },
    {
      key: '/dashboard/closed',
      icon: <CheckSquareOutlined />,
      label: 'Closed Boards',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Sider 
      trigger={null} 
      collapsible={false}
      collapsed={false}
      style={{
        background: '#fff',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'auto'
      }}
    >
      {/* Logo Header - Separate Row */}
      <div style={{ 
        height: 64, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 16px',
        borderBottom: '1px solid #f0f0f0',
        backgroundColor: '#fff'
      }}>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer',
            width: '100%'
          }}
          onClick={handleLogoClick}
        >
          <img 
            src={trelloLogo} 
            alt="Trello Logo"
            style={{
              height: 24,
              width: 'auto'
            }}
          />
        </div>
      </div>
      
      {/* Workspaces Section */}
      <div style={{ padding: '12px 16px 8px 16px' }}>
        <Text style={{ 
          fontSize: '12px', 
          color: '#000000', 
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          YOUR WORKSPACES
        </Text>
      </div>
      
      {/* Main Menu */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ 
          borderRight: 0,
          background: 'transparent'
        }}
        className="sidebar-menu"
      />

      {/* Separator */}
      <div style={{ 
        height: '1px', 
        backgroundColor: '#f0f0f0', 
        margin: '16px 24px' 
      }} />

      {/* Your boards Section - Always show */}
      <div style={{ padding: '16px 24px 8px 24px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <Text style={{ 
            fontSize: '12px', 
            color: '#000000', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Your boards
          </Text>
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={handleCreateBoard}
            style={{
              color: '#42526e',
              padding: '4px',
              minWidth: 'auto',
              height: 'auto',
              fontSize: '12px'
            }}
          />
        </div>
        
        {/* Board List */}
        <div>
          {boards.map((board) => {
            const isActive = location.pathname === `/dashboard/boards/${board.id}`;
            return (
              <div
                key={board.id}
                onClick={() => handleBoardClick(board.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 0',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  backgroundColor: isActive ? '#f4f5f7' : 'transparent',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#f4f5f7';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {/* Board Image */}
                <div
                  style={{
                    width: '20px',
                    height: '16px',
                    borderRadius: '2px',
                    marginRight: '8px',
                    flexShrink: 0,
                    overflow: 'hidden',
                    backgroundImage: `url(${board.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                
                {/* Board Title */}
                <Text style={{
                  fontSize: '14px',
                  color: '#172b4d',
                  fontWeight: 400,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1
                }}>
                  {board.title}
                </Text>
              </div>
            );
          })}
        </div>
      </div>

      {/* User Info removed per design */}
    </Sider>
  );
};

export default Sidebar;

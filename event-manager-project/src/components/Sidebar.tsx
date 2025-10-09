import React, { useState, useEffect } from 'react';
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
import { getBoardsByUserId, Board } from '../api/boardsApi';
import { getCurrentUser } from '../utils/authUtils';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [boards, setBoards] = useState<Board[]>([]);

  // Load boards data
  useEffect(() => {
    const loadBoards = async () => {
      try {
        const user = getCurrentUser();
        if (user) {
          const boardsData = await getBoardsByUserId(user.id);
          setBoards(boardsData);
        }
      } catch (error) {
        console.error('Error loading boards:', error);
      }
    };

    loadBoards();
  }, []);

  // Filter boards based on current route
  const getFilteredBoards = () => {
    const path = location.pathname;
    
    if (path === '/dashboard/starred') {
      return boards.filter(board => board.is_starred);
    } else if (path === '/dashboard/closed') {
      return boards.filter(board => 
        board.title.toLowerCase().includes('closed') || 
        board.title.toLowerCase().includes('archived') ||
        board.title.toLowerCase().includes('done')
      );
    } else {
      // Default to all boards for /dashboard/boards
      return boards;
    }
  };

  const filteredBoards = getFilteredBoards();


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

  const handleSettings = () => {
    navigate('/dashboard/settings');
  };

  // Determine if we are on any board-related page (/dashboard/boards or /dashboard/boards/:id)
  const isBoardDetailPage = /^\/dashboard\/boards(\/|$)/.test(location.pathname);

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      handleLogout();
      return;
    }
    navigate(key);
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

      {isBoardDetailPage ? (
        // Your boards appears only on board detail pages
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
            {filteredBoards.map((board) => {
              const isActive = location.pathname === `/dashboard/boards/${board.id}`;
              return (
                <div
                  key={board.id}
                  onClick={() => handleBoardClick(board.id!)}
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
                      backgroundImage: `url(${board.backdrop})`,
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
      ) : (
        // On dashboard and other non-board pages, show Settings and Sign out as menu items
        <>
          <div style={{ 
            height: '1px', 
            backgroundColor: '#f0f0f0', 
            margin: '16px 24px' 
          }} />
          <Menu
            mode="inline"
            selectedKeys={[]}
            items={[
              { key: '/dashboard/settings', icon: <SettingOutlined />, label: 'Settings' },
              { key: 'logout', icon: <LogoutOutlined />, label: 'Sign out' },
            ]}
            onClick={handleUserMenuClick}
            style={{ 
              borderRight: 0,
              background: 'transparent'
            }}
            className="sidebar-menu"
          />
        </>
      )}

      {/* User Info removed per design */}
    </Sider>
  );
};

export default Sidebar;

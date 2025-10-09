import axiosInstance from './axiosInstance';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  created_at?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Đăng ký người dùng mới
export const registerUser = async (userData: RegisterData): Promise<User> => {
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUsers = await axiosInstance.get('/users');
    const userExists = existingUsers.data.find((user: User) => user.email === userData.email);
    
    if (userExists) {
      throw new Error('Email này đã được sử dụng!');
    }

    const response = await axiosInstance.post('/users', {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      created_at: new Date().toISOString()
    });
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Có lỗi xảy ra khi đăng ký!');
  }
};

// Đăng nhập
export const loginUser = async (loginData: LoginData): Promise<User> => {
  try {
    const response = await axiosInstance.get('/users');
    const users: User[] = response.data;
    
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
    
    if (!user) {
      throw new Error('Email hoặc mật khẩu không đúng!');
    }
    
    return user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Có lỗi xảy ra khi đăng nhập!');
  }
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (userId: number): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể lấy thông tin người dùng!');
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
  try {
    const response = await axiosInstance.patch(`/users/${userId}`, userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể cập nhật thông tin người dùng!');
  }
};

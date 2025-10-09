import axiosInstance from './axiosInstance';

export interface Board {
  id?: number;
  user_id: number;
  title: string;
  description: string;
  backdrop: string;
  is_starred: boolean;
  created_at?: string;
}

export interface List {
  id?: number;
  board_id: number;
  title: string;
  created_at?: string;
}

export interface Task {
  id?: number;
  list_id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  due_date?: string;
  created_at?: string;
}

export interface Tag {
  id?: number;
  task_id: number;
  content: string;
  color: string;
}

// ===== BOARD APIs =====

// Lấy tất cả boards của user
export const getBoardsByUserId = async (userId: number): Promise<Board[]> => {
  try {
    const response = await axiosInstance.get(`/boards?user_id=${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể lấy danh sách boards!');
  }
};

// Lấy board theo ID
export const getBoardById = async (boardId: number): Promise<Board> => {
  try {
    const response = await axiosInstance.get(`/boards/${boardId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể lấy thông tin board!');
  }
};

// Tạo board mới
export const createBoard = async (boardData: Omit<Board, 'id' | 'created_at'>): Promise<Board> => {
  try {
    const response = await axiosInstance.post('/boards', {
      ...boardData,
      created_at: new Date().toISOString()
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể tạo board mới!');
  }
};

// Cập nhật board
export const updateBoard = async (boardId: number, boardData: Partial<Board>): Promise<Board> => {
  try {
    const response = await axiosInstance.patch(`/boards/${boardId}`, boardData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể cập nhật board!');
  }
};

// Xóa board
export const deleteBoard = async (boardId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/boards/${boardId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể xóa board!');
  }
};

// ===== LIST APIs =====

// Lấy tất cả lists của board
export const getListsByBoardId = async (boardId: number): Promise<List[]> => {
  try {
    const response = await axiosInstance.get(`/lists?board_id=${boardId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể lấy danh sách lists!');
  }
};

// Tạo list mới
export const createList = async (listData: Omit<List, 'id' | 'created_at'>): Promise<List> => {
  try {
    const response = await axiosInstance.post('/lists', {
      ...listData,
      created_at: new Date().toISOString()
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể tạo list mới!');
  }
};

// Cập nhật list
export const updateList = async (listId: number, listData: Partial<List>): Promise<List> => {
  try {
    const response = await axiosInstance.patch(`/lists/${listId}`, listData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể cập nhật list!');
  }
};

// Xóa list
export const deleteList = async (listId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/lists/${listId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể xóa list!');
  }
};

// ===== TASK APIs =====

// Lấy tất cả tasks của list
export const getTasksByListId = async (listId: number): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get(`/tasks?list_id=${listId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể lấy danh sách tasks!');
  }
};

// Tạo task mới
export const createTask = async (taskData: Omit<Task, 'id' | 'created_at'>): Promise<Task> => {
  try {
    const response = await axiosInstance.post('/tasks', {
      ...taskData,
      created_at: new Date().toISOString()
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể tạo task mới!');
  }
};

// Cập nhật task
export const updateTask = async (taskId: number, taskData: Partial<Task>): Promise<Task> => {
  try {
    const response = await axiosInstance.patch(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể cập nhật task!');
  }
};

// Xóa task
export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/tasks/${taskId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể xóa task!');
  }
};

// ===== TAG APIs =====

// Lấy tất cả tags của task
export const getTagsByTaskId = async (taskId: number): Promise<Tag[]> => {
  try {
    const response = await axiosInstance.get(`/tags?task_id=${taskId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể lấy danh sách tags!');
  }
};

// Tạo tag mới
export const createTag = async (tagData: Omit<Tag, 'id'>): Promise<Tag> => {
  try {
    const response = await axiosInstance.post('/tags', tagData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể tạo tag mới!');
  }
};

// Xóa tag
export const deleteTag = async (tagId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/tags/${tagId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Không thể xóa tag!');
  }
};

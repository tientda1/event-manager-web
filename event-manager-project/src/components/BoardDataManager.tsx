import { useState, useEffect } from 'react';
import { getBoardById, getListsByBoardId, getTasksByListId, getTagsByTaskId } from '../api/boardsApi';
import type { Board, List, Task, Tag } from '../api/boardsApi';

interface BoardDataManagerProps {
  boardId: number;
  children: (data: {
    board: Board | null;
    lists: List[];
    tasks: { [listId: number]: Task[] };
    tags: { [taskId: number]: Tag[] };
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }) => React.ReactNode;
}

export const BoardDataManager: React.FC<BoardDataManagerProps> = ({ boardId, children }) => {
  const [board, setBoard] = useState<Board | null>(null);
  const [lists, setLists] = useState<List[]>([]);
  const [tasks, setTasks] = useState<{ [listId: number]: Task[] }>({});
  const [tags, setTags] = useState<{ [taskId: number]: Tag[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch board info
      const boardData = await getBoardById(boardId);
      setBoard(boardData);

      // Fetch lists for this board
      const listsData = await getListsByBoardId(boardId);
      setLists(listsData);

      // Fetch tasks for each list
      const tasksData: { [listId: number]: Task[] } = {};
      const tagsData: { [taskId: number]: Tag[] } = {};

      for (const list of listsData) {
        const listTasks = await getTasksByListId(list.id!);
        tasksData[list.id!] = listTasks;

        // Fetch tags for each task
        for (const task of listTasks) {
          const taskTags = await getTagsByTaskId(task.id!);
          tagsData[task.id!] = taskTags;
        }
      }

      setTasks(tasksData);
      setTags(tagsData);

    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu board');
      console.error('Error fetching board data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, [boardId]);

  return (
    <>
      {children({
        board,
        lists,
        tasks,
        tags,
        loading,
        error,
        refetch: fetchBoardData
      })}
    </>
  );
};

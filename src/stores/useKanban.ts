
import { create } from "zustand";
type Task={
    id:number|string;
    title:string;
    
}

interface Board{
    groupId:string;
    groupName:string;
    tasks:Task[];
}

export const useKanban=create<{
    boards:Board[];
    createBoard:(board:Board)=>void;
    updateBoard:(board:Board)=>void;
    moveTask:(taskId:string,sourceGroupId:string,targetGroupId:string)=>void;   
}>((set)=>({
    boards:[],
    createBoard:(board:Board)=>set((state)=>({
        boards:[...state.boards,board]
    })),
    // updateBoard:(board:Board)=>set((state)=>({
    //     boards:state.boards.map((b)=>b.groupId===board.groupId?board:b)
    // })),
    updateBoard: (updatedBoard) => set((state) => ({
    // 关键：必须返回一个新的 boards 数组，并替换掉对应的那一项
    boards: state.boards.map((board) => 
      board.groupId === updatedBoard.groupId ? updatedBoard : board
    )
  })),

  moveTask: (taskId, sourceGroupId, targetGroupId) => {
    set((state) => {
      // 1. 找到源板和任务
      const sourceBoard = state.boards.find((b) => b.groupId === sourceGroupId);
      
      // 使用 String() 确保类型一致，防止 number vs string 比较失败
      const taskToMove = sourceBoard?.tasks.find((t) => String(t.id) === String(taskId));

      if (!taskToMove) {
        console.warn(`Task ${taskId} not found in group ${sourceGroupId}`);
        return state; // 未找到任务，不改变状态
      }

      // 2. 构建新的 boards 数组
      const newBoards = state.boards.map((board) => {
        // 情况 A: 当前板是源板
        if (board.groupId === sourceGroupId) {
          // 如果源和目标相同，且需要支持排序，这里逻辑会更复杂
          // 目前简单处理：如果是同一组，先移除，稍后在目标组添加（即移到末尾）
          // 如果希望保持原位或插入特定位置，需要传入 index
          return {
            ...board,
            tasks: board.tasks.filter((t) => String(t.id) !== String(taskId)),
          };
        }

        // 情况 B: 当前板是目标板
        if (board.groupId === targetGroupId) {
          return {
            ...board,
            // 将任务添加到目标组的末尾
            // 如果需要插入到特定位置，可以使用 splice 或 slice
            tasks: [...board.tasks, taskToMove],
          };
        }

        // 情况 C: 其他板，不变
        return board;
      });

      return {
        boards: newBoards,
      };
    });
  },
}));

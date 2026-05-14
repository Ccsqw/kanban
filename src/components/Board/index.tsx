import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useKanban } from "../../stores/useKanban";
import { Task } from "./Task";
import { KanbanGroup } from "./kanbanGroup";
export const Board = () => {
    const { boards,updateBoard,moveTask} = useKanban();
    const handleDragEnd = ({ active, over }:DragEndEvent) => {
        console.log("Dragged from", active, "to", over);
        // 这里可以根据 active.id 和 over.id 来更新状态，进行任务的移动
        const{id}=active;
        
        const[gId,tId]=
        typeof id==='number'?
        [active.id.toString(),id]
        :active.id.split('-');
        
        moveTask(tId,gId,over.id as string)
    }
    return (
    <DndContext 
    onDragEnd={handleDragEnd}>

        <div className="flex flex-row">
        {
            boards.map((board) => (
        <div key={board.groupId} className="flex flex-row">
            <KanbanGroup 
            groupId={board.groupId} 
            title={board.groupName} >
            <div className="kanban-group p-2 mr-1  w-[260px] rounded-[1.5rem] bg-blue-100"> 
                <div className="flex flex-col">
                    <div className="w-fit rounded-full bg-blue-300 p-1 mb-2">
                        未开始
                    </div>
                    <div>
                            {
                            board.tasks.map((item) => (
                            <Task 
                            key={item.id} 
                            id  ={`${board.groupId}-${item.id}`}
                            
                            title={item.title} 
                            />
                        ))
                        }
                    </div>
                </div>
                      
            </div>
            <button onClick={()=>{
                    updateBoard(
                        {
                           groupId:board.groupId,
                           groupName:board.groupName,
                           tasks:[
                               ...board.tasks,
                               {
                                   id:Date.now(),
                                   title:`新任务`
                               }
                           ]
                        }
                    )
                 }}>创建任务</button>  
            </ KanbanGroup>
        
        </div>
            ))
        }
        
        
        </div>
    </DndContext>

    );
    
}
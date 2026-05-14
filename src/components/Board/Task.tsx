import { useDraggable } from "@dnd-kit/core";

interface TaskProps {
 id: number|string;
  title: string;
}

export const Task = (props: TaskProps) => {
    const {id, title } = props;
    const {attributes,listeners,setNodeRef,transform} =useDraggable(
        {
            id,
            data:{
                type: "task",   
            }
        }
    );
    // const style:React.CSSProperties|undefined ={
    //     // 方式A (推荐): 使用 dnd-kit 工具库
    //     // ...CSS.Transform.toString(transform),
        
    //     // 方式B (手动处理): 如果 transform 为 null，则不使用变换，否则应用变换
    //     transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    // };
    const style: React.CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
    return (
        <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className="p-2 mb-1 bg-white border-gray-100 rounded-[6px]">
            {title}
         </div>

    );
}
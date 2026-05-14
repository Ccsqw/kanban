import { useKanban } from "../../stores/useKanban";
import { Button } from "../../components/ui/button";
import { Board } from "../../components/Board";
export const BoardPage = () => {
    const {boards, createBoard} = useKanban();
    return (
        <div >
            <Board />
            <Button 
                variant="outline"
             onClick={() =>
                 createBoard({
                    groupId: `${boards.length}`,
                    groupName: `新板`,
                    tasks: [],
                 })}>
                    创建分组
                </Button>
        </div>
    );
}

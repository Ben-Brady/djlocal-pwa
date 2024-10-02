import QueueEntry from "@/components/extensive/QueueEntry";
import { SongMetadata } from "@/lib/songs";
import { FC } from "react";
import { DragDropContext, Droppable, Draggable, OnDragEndResponder } from "react-beautiful-dnd";

const OrderableSongList: FC<{
    songs: SongMetadata[];
    onMoveElement: (source: number, destination: number) => void;
}> = ({ songs, onMoveElement }) => {
    const onDragEnd: OnDragEndResponder = result => {
        if (!result.destination) return;

        const start = result.source.index;
        const end = result.destination.index;
        onMoveElement(start, end);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="queue">
                {dropable => (
                    <div ref={dropable.innerRef} {...dropable.droppableProps}>
                        {songs.map((song, index) => (
                            <Draggable key={song.id} draggableId={song.id.toString()} index={index}>
                                {draggable => (
                                    // @ts-expect-error, DIV props
                                    <div
                                        {...draggable.draggableProps}
                                        {...draggable.dragHandleProps}
                                        ref={draggable.innerRef}
                                    >
                                        <QueueEntry song={song} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {dropable.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default OrderableSongList;

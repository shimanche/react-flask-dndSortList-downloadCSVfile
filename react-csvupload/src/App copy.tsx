import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SimpleSortableItem from './components/SimpleSortableItem';

const ITEMS = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
];

const App: React.FC = () => {
  const [items, setItems] = useState(ITEMS);

  return (
    <div>
      <h1>Sortable List</h1>
      {/* <DndContext collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]}> */}
      <DndContext
            onDragEnd={(event) => {
              const { active, over } = event;
              if (over == null) {
                return;
              }
              if (active.id !== over.id) {
                setItems((items) => {
                  const oldIndex = items.findIndex(
                    (item) => item.id === active.id
                  );
                  const newIndex = items.findIndex(
                    (item) => item.id === over.id
                  );
                  return arrayMove(items, oldIndex, newIndex);
                });
              }
            }}
          >  
        <SortableContext items={items}>
          {items.map((item) => (
            <SimpleSortableItem key={item.id} item={item} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App;

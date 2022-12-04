import React, { useContext } from 'react';
import useAppState from 'src/state';
import Note from 'src/component/Note';
import './styles.scss';

import type { MouseEvent } from 'react';

export default ({ Icon, boxIndex }: { Icon: any; boxIndex: number }) => {
  const { state, addBlockItem, removeBlockItem } = useAppState();
  const { name, data } = state[boxIndex];

  const handleAddClick = (event: MouseEvent<HTMLElement>) => {
    const item = prompt(`输入新的 ${state[boxIndex].name} `);
    if (!item) return;
    addBlockItem(boxIndex, item);
  };

  const handleRemoveClick = (event: MouseEvent<HTMLElement>) => {
    const index = Number(event.currentTarget.dataset.index);
    const proceed = confirm(`删除 "${state[boxIndex].data[index]}"?`);
    if (!proceed) return;
    removeBlockItem(boxIndex, index);
  };

  return (
    <div className="CanvasBlock" data-box-index={boxIndex}>
      <header className="CanvasBlock-header">
        <span className="CanvasBlock-name">{name}</span>
        <button className="CanvasBlock-button" onClick={handleAddClick}>
          添加
        </button>
        <Icon className="CanvasBlock-icon" />
      </header>
      <ol className="CanvasBlock-list">
        {data.map((item: string, index: number) => (
          <Note
            data-index={index}
            onClick={handleRemoveClick}
            text={item}
            key={item + index}
          />
        ))}
      </ol>
    </div>
  );
};

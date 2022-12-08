export type CanvasType = {
  name: string;
  data: string[];
}[];

const canvasTemplate: CanvasType = [
  { name: 'KP 重要合作', data: [] },
  { name: 'KA 关键业务', data: [] },
  { name: 'KR 核心资源', data: [] },
  { name: 'VP 价值主张', data: [] },
  { name: 'CR 客户关系', data: [] },
  { name: 'CH 渠道通路', data: [] },
  { name: 'CS 客户细分', data: [] },
  { name: 'C￥ 成本结构', data: [] },
  { name: 'R￥ 收入来源', data: [] },
  { name: 'Overview 商业模式说明', data: [] }
];

const KEY = 'canvas-key-1';
const VERSION = '0.1';
const getMetadata = () => ({
  version: VERSION,
  lastUpdated: new Date().toISOString()
});

export const saveCanvas = (canvas: CanvasType) => {
  localStorage.setItem(
    KEY,
    btoa(encodeURIComponent(JSON.stringify([getMetadata(), canvas])))
  );
};

const convertOldSavedData = (oldCanvas: { [key: string]: string }) => {
  try {
    const newCanvas = Object.entries(oldCanvas).flatMap(([key, value]) => [
      { name: key, data: value }
    ]);
    return [getMetadata(), newCanvas];
  } catch {
    return [getMetadata(), canvasTemplate];
  }
};

export const loadCanvas = () => {
  const savedCanvas = localStorage.getItem(KEY);
  if (!savedCanvas) return canvasTemplate;
  const retrievedData = JSON.parse(decodeURIComponent(atob(savedCanvas)));
  const [metadata, data] = Array.isArray(retrievedData)
    ? retrievedData
    : convertOldSavedData(retrievedData);
  return data;
};

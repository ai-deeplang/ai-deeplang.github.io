export type CanvasType = {
  name: string;
  data: string[];
}[];

const canvasTemplate: CanvasType = [
  { name: '问题和现有选择', data: [] },
  { name: '解决方案', data: [] },
  { name: '关键指标', data: [] },
  { name: '独特卖点和概括性描述', data: [] },
  { name: '门槛优势', data: [] },
  { name: '用户渠道', data: [] },
  { name: '客户群类型和早期接受者', data: [] },
  { name: '成本结构', data: [] },
  { name: '营收来源', data: [] },
  { name: '精益画布说明', data: [] }
];

const KEY = 'canvas-lean-key-1';
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

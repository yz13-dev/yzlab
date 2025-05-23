import { create } from "zustand";

type State = {
  dpr: number;
  width: number;
  height: number;
};

export const useCanvasState = create<State>()((set) => ({
  width: 900,
  height: 600,
  dpr: 1,
}));

export const setDpr = (dpr: number) => {
  const currentDpr = useCanvasState.getState().dpr;
  if (currentDpr === dpr) return;
  else useCanvasState.setState({ dpr });
};

export const getSize = () => {
  const width = useCanvasState.getState().width;
  const height = useCanvasState.getState().height;
  return { width, height };
};

export const setSize = (width: number, height: number) => {
  useCanvasState.setState({ width, height });
};

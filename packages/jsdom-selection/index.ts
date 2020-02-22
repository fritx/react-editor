// @note window.getSelection mock for jsdom < 16.0
// https://github.com/search?q=window.getSelection+isn%27t+in+jsdom&type=Code
if (!window.getSelection) {
  // todo more
  const range = {};
  const selection = {
    rangeCount: 1,
    getRangeAt: () => {
      return range;
    },
    selectAllChildren: () => {
      // todo
    },
    collapseToEnd: () => {
      // todo
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).getSelection = () => {
    return selection;
  };
}

// @note for All files must be modules when the '--isolatedModules' flag is provided
export default {};

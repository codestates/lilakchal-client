export const noRefresh = (event: KeyboardEvent): void => {
  if ((event.ctrlKey == true && (event.key === 'n' || event.key == 'r')) || (event.key === 'F5') || (event.key === 'command')) {
    event.cancelBubble = true;
    event.returnValue = false;
  } 
};

document.onkeydown = noRefresh;
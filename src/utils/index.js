export const copyToClipboard = (text, toast) => {
  let dummy = document.createElement("textarea");
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild(dummy);
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);

  const toastProps = {
    text: 'Note copied!',
    actionText: 'Ok',
    ariaLabel: 'Note copied, click to acknowledge',
    onActionClick: toast.hide,
  };

  toast.show(toastProps)
}
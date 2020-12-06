const isInputElement = (el) => {
    const elTagName = el.tagName.toLowerCase();
    return ['input', 'textarea'].includes(elTagName);
};

export default isInputElement;

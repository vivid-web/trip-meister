export const handleDownload = (fileName: string, blob: Blob) => {
	const elem = window.document.createElement("a");
	elem.href = window.URL.createObjectURL(blob);
	elem.download = fileName;
	document.body.appendChild(elem);
	elem.click();
	document.body.removeChild(elem);
};

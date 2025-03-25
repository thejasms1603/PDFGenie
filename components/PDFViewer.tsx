
type PDFViewerProps = {
    pdf_url : string;
}

const PDFViewer = ({pdf_url}: PDFViewerProps) => {
  return (
    <iframe src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`} className="w-full h-full">PDFViewer</iframe>
  )
}

export default PDFViewer
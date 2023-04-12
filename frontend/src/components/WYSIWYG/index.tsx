import ReactQuill from 'react-quill'

interface WYSIWYGProps {
  value: string
  onChange: (value: string) => void
}
const WYSIWYG: React.FC<WYSIWYGProps> = ({ value, onChange }) => {
  return <ReactQuill value={value} onChange={onChange} />
}

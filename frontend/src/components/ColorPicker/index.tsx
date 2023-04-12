import { Color, SketchPicker } from 'react-color'

interface ColorPickerProps {
  color: Color
  setColor: (color: Color) => void
}
const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => {
  return (
    <SketchPicker
      color={color}
      onChangeComplete={(color) => setColor(color.hex)}
    />
  )
}

export default ColorPicker

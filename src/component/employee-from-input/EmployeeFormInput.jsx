import React from 'react'
import './EmployeeFormInput.scss'

function MyInput(props) {
    const {value, onChange, title, type, placeholder} =props
    // console.log(props)
  return (
    <>
        <label className="label">
          {title}
          <input  placeholder={placeholder} className="input" type={type} value={value} onChange={onChange} />
        </label>
    </>
  )
}
export default MyInput
import { E164Number } from 'libphonenumber-js/types'
import React, { FC, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface IPhoneNumberInput {
    phone: E164Number | undefined,
    setPhone: (phone: E164Number) => void
}

const PhoneNumberInput: FC<IPhoneNumberInput> = ({phone, setPhone}) => {

  return (
    <div>
      <PhoneInput
        value={phone}
        onChange={setPhone}
      />
    </div>
  )
}

export default PhoneNumberInput

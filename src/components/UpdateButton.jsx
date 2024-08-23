"use client"

import React from 'react'
import { useFormStatus } from 'react-dom'

const UpdateButton = () => {
  const {pending} =  useFormStatus()
  return (
    <button disabled={pending} className='flex items-center justify-center cursor-pointer bg-vsb text-white p-2 max-w-96 rounded-md disabled:cursor-not-allowed disabled:bg-pink-200'>{pending ? "Updating..." : "Update"}</button>
  )
}

export default UpdateButton
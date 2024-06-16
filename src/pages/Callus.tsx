import React from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import { CallusTable } from '../components/Tables/CallUs/CallusTable'

export const Callus = () => {
  return (
    <>
    <DefaultLayout>
        <div className="flex flex-col gap-10">
            <CallusTable pageName='Call Us Management' pagetitle='Call us' />
        </div>
    </DefaultLayout>
    </>
  )
}

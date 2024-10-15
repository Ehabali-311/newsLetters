import React from 'react'
import TopTitle from '../../Layouts/topTitle/TopTitle'
import Card from '../../Components/cards/Card'

const NewLetters = ({data}) => {
  return (
    <>
    <TopTitle/>
    <Card dataNews={data}/>
    </>
  )
}

export default NewLetters

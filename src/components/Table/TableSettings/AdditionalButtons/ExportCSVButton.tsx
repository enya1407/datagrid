import {Button} from "antd";
import React from "react";
import {useSelector} from "react-redux";
import {personsSelector} from "../../../../selector/selector";
import {CSVLink} from 'react-csv'

const ExportCSVButton = () => {
  const persons = useSelector(personsSelector)
  return (
    <Button title="download data in CSV"><CSVLink data={persons} filename="persons.csv">Export CSV</CSVLink></Button>

  )
}

export default ExportCSVButton